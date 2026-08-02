"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Upload, X, Loader2, RotateCcw } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  label?: string;
  folder?: string;
  className?: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUpload({
  value,
  onChange,
  onUploadingChange,
  label = "Image",
  folder = "settings",
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  const handleUpload = useCallback(async () => {
    if (!fileRef.current) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", fileRef.current);
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

      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      fileRef.current = null;
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [preview, folder, onChange]);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Use PNG, JPG, or WebP.");
        return;
      }
      if (file.size > MAX_SIZE) {
        setError("Max 5MB.");
        return;
      }

      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      fileRef.current = file;

      // Auto-upload immediately
      setTimeout(() => {
        handleUpload();
      }, 0);
    },
    [handleUpload]
  );

  const handleCancel = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    fileRef.current = null;
    setError(null);
  };

  const handleRemove = () => {
    onChange("");
  };

  const handleRetry = () => {
    if (fileRef.current) {
      handleUpload();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const imageUrl = preview || value;

  return (
    <div className={className}>
      <p className="text-[0.8125rem] font-medium text-[#1B1B1B] mb-2">{label}</p>

      {imageUrl ? (
        <div className="relative inline-block">
          <Image
            src={imageUrl}
            alt={label}
            width={200}
            height={200}
            className="w-full max-w-[200px] h-auto aspect-square object-cover rounded-lg border border-gray-200"


          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={preview ? handleCancel : handleRemove}
              className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-[#C89B5B] bg-[#C89B5B]/5"
              : "border-gray-200 hover:border-[#C89B5B]/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
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
              <p className="text-[0.75rem] text-gray-400 mt-0.5">PNG, JPG, WebP up to 5MB</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-2">
          <p className="text-[0.75rem] text-red-500">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="text-[0.75rem] text-[#C89B5B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
