"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadGalleryProps {
  multiple?: boolean;
  maxFiles?: number;
}

interface FileItem {
  id: string;
  url: string;
  name: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function UploadGallery({ multiple = false, maxFiles = 10 }: UploadGalleryProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, []);

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newItems: FileItem[] = [];
      const remaining = maxFiles - files.length;

      for (let i = 0; i < Math.min(fileList.length, multiple ? remaining : 1); i++) {
        const file = fileList[i];
        if (!ACCEPTED_TYPES.includes(file.type)) {
          alert(`"${file.name}" is not a supported image type. Use PNG, JPG, or WebP.`);
          continue;
        }
        if (file.size > MAX_SIZE) {
          alert(`"${file.name}" exceeds 5MB limit.`);
          continue;
        }
        newItems.push({
          id: `${Date.now()}-${i}`,
          url: URL.createObjectURL(file),
          name: file.name,
        });
      }

      if (newItems.length > 0) {
        setFiles((prev) => (multiple ? [...prev, ...newItems] : newItems));
      }
    },
    [files.length, maxFiles, multiple]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    },
    [processFiles]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? "border-[#C89B5B] bg-[#C89B5B]/5"
            : "border-gray-200 hover:border-[#C89B5B]/50"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">
              Drag & drop {multiple ? "images" : "an image"} here
            </p>
            <p className="text-[0.8125rem] text-gray-500 mt-1">
              or{" "}
              <span className="text-[#C89B5B] font-medium hover:underline">
                browse files
              </span>
            </p>
          </div>
          <p className="text-[0.75rem] text-gray-400">
            PNG, JPG, WebP up to 5MB {multiple && `• Max ${maxFiles} files`}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {files.map((file) => (
            <div key={file.id} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && multiple && files.length < maxFiles && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Add More
        </Button>
      )}
    </div>
  );
}
