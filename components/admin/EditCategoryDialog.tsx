"use client";

import { useState } from "react";
import { Loader2, FolderOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Category } from "@/types/admin";

interface EditCategoryDialogProps {
  category: Category | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditCategoryDialog({
  category,
  open,
  onClose,
  onUpdated,
}: EditCategoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState(() => ({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    image: category?.image ?? "",
    description: category?.description ?? "",
    isActive: category?.isActive ?? true,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          image: form.image,
          description: form.description,
          isActive: form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengupdate kategori");
      }
      onClose();
      onUpdated();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengupdate kategori");
    } finally {
      setLoading(false);
    }
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setErrorMessage(null); onClose(); } }}>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Edit Kategori
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Section: Info Kategori */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FolderOpen className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Info Kategori</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">
                Nama Kategori <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
              />
            </div>
            <ImageUpload
              label="Gambar"
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
              onUploadingChange={setImageUploading}
              folder="categories"
            />
          </div>

          {/* Section: Deskripsi & Pengaturan */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FileText className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Deskripsi & Pengaturan</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#E7E3DD] px-4 py-3">
              <Label htmlFor="edit-active" className="text-sm cursor-pointer">
                Active
              </Label>
              <Switch
                id="edit-active"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: checked }))}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-[0.8125rem] text-red-500">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E3DD]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
              disabled={loading || imageUploading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#C89B5B] hover:bg-[#B08A4A] text-black cursor-pointer"
              disabled={loading || imageUploading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : imageUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
