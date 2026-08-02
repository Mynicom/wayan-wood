"use client";

import Image from "next/image";
import { FolderOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Category } from "@/types/admin";

interface ViewCategoryDialogProps {
  category: Category | null;
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ViewCategoryDialog({ category, open, onClose }: ViewCategoryDialogProps) {
  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Detail Kategori
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Section: Gambar */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FolderOpen className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Gambar Kategori</h3>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"


              />
            </div>
          </div>

          {/* Section: Info Kategori */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FolderOpen className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Info Kategori</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Nama</p>
                <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">{category.name}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Slug</p>
                <p className="text-[0.9375rem] text-gray-500 font-mono">{category.slug}</p>
              </div>
            </div>
          </div>

          {/* Section: Deskripsi & Status */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Clock className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Deskripsi & Status</h3>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Deskripsi</p>
              <p className="text-[0.875rem] text-gray-600 leading-relaxed">{category.description}</p>
            </div>
            <StatusBadge label={category.isActive ? "Active" : "Inactive"} variant={category.isActive ? "success" : "danger"} />
            <div className="text-[0.8125rem] text-gray-500">
              Dibuat: {formatDate(category.createdAt)} · Diperbarui: {formatDate(category.updatedAt)}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
