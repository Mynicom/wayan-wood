"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Upload, X, Loader2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Image from "next/image";

interface ImageGalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
  label?: string;
  folder?: string;
  maxFiles?: number;
  className?: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

interface PendingFile {
  id: string;
  localUrl: string;
  file: File;
  uploading: boolean;
  error: string | null;
}

export default function ImageGalleryUpload({
  value = [],
  onChange,
  onUploadingChange,
  label = "Gallery Images",
  folder = "products",
  maxFiles = 10,
  className,
}: ImageGalleryUploadProps) {
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const mergingUrlsRef = useRef<string[]>([]);

  const isUploading = pending.some((p) => p.uploading);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  useEffect(() => {
    if (!validationError) return;
    const timer = setTimeout(() => setValidationError(null), 3000);
    return () => clearTimeout(timer);
  }, [validationError]);

  const uploadFile = useCallback(
    async (item: PendingFile) => {
      setPending((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, uploading: true, error: null } : p))
      );

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const { url } = await res.json();

        URL.revokeObjectURL(item.localUrl);
        setPending((prev) => prev.filter((p) => p.id !== item.id));

        mergingUrlsRef.current = [...mergingUrlsRef.current, url];
        const merged = [...new Set([...valueRef.current, ...mergingUrlsRef.current])];
        onChange(merged);
      } catch (err) {
        setPending((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? { ...p, uploading: false, error: err instanceof Error ? err.message : "Failed" }
              : p
          )
        );
      }
    },
    [folder, onChange]
  );

  const processFiles = useCallback(
    async (fileList: FileList) => {
      const remaining = maxFiles - value.length - pending.length;
      const newItems: PendingFile[] = [];

      for (let i = 0; i < Math.min(fileList.length, remaining); i++) {
        const file = fileList[i];
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setValidationError(`"${file.name}" is not a supported image type.`);
          continue;
        }
        if (file.size > MAX_SIZE) {
          setValidationError(`"${file.name}" exceeds 5MB limit.`);
          continue;
        }
        newItems.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          localUrl: URL.createObjectURL(file),
          file,
          uploading: false,
          error: null,
        });
      }

      if (newItems.length > 0) {
        mergingUrlsRef.current = [];
        setPending((prev) => [...prev, ...newItems]);

        for (const item of newItems) {
          await uploadFile(item);
        }
      }
    },
    [value.length, pending.length, maxFiles, uploadFile]
  );

  const retryUpload = useCallback(
    (item: PendingFile) => {
      uploadFile(item);
    },
    [uploadFile]
  );

  const removePending = (id: string) => {
    setPending((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.localUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const removeExisting = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const totalCount = value.length + pending.length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[0.8125rem] font-medium text-[#1B1B1B]">{label}</p>
        <p className="text-[0.75rem] text-gray-400">
          {totalCount}/{maxFiles} images
        </p>
      </div>

      {/* Existing images */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"


              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveItem(index, index - 1)}
                    className="w-6 h-6 bg-black/60 rounded flex items-center justify-center hover:bg-black/80 cursor-pointer"
                  >
                    <ChevronLeft className="w-3 h-3 text-white" />
                  </button>
                )}
                {index < value.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveItem(index, index + 1)}
                    className="w-6 h-6 bg-black/60 rounded flex items-center justify-center hover:bg-black/80 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeExisting(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all cursor-pointer"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pending uploads */}
      {pending.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {pending.map((item) => (
            <div
              key={item.id}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={item.localUrl}
                alt="Pending"
                className="w-full h-full object-cover"
              />
              {item.uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              {item.error && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                  <span className="text-[0.625rem] text-red-300 text-center px-1">{item.error}</span>
                  <button
                    type="button"
                    onClick={() => retryUpload(item)}
                    className="flex items-center gap-1 text-[0.625rem] text-white hover:text-red-300 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Retry
                  </button>
                </div>
              )}
              {!item.uploading && !item.error && (
                <button
                  type="button"
                  onClick={() => removePending(item.id)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all cursor-pointer"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {totalCount < maxFiles && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-[#C89B5B] bg-[#C89B5B]/5"
              : "border-gray-200 hover:border-[#C89B5B]/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-[0.875rem] font-medium text-[#1B1B1B]">
                Drag & drop or{" "}
                <span className="text-[#C89B5B]">browse</span>
              </p>
              <p className="text-[0.75rem] text-gray-400 mt-0.5">
                PNG, JPG, WebP up to 5MB each
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation error */}
      {validationError && (
        <p className="text-[0.75rem] text-red-500 mt-2">{validationError}</p>
      )}
    </div>
  );
}
