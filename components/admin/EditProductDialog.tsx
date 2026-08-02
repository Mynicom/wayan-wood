"use client";

import { useState } from "react";
import { Loader2, Package, Layers, ImageIcon, FileText, Settings } from "lucide-react";
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
import ImageGalleryUpload from "@/components/admin/ImageGalleryUpload";
import type { Product, Category } from "@/types/admin";

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  categories: Category[];
}

export default function EditProductDialog({
  product,
  open,
  onClose,
  onUpdated,
  categories,
}: EditProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState(() => ({
    name: product?.name ?? "",
    categoryId: product ? String(product.categoryId) : "",
    price: product ? String(product.price) : "",
    thumbnail: product?.thumbnail ?? "",
    images: product?.images?.map((img) => img.image) ?? ([] as string[]),
    shortDescription: product?.shortDescription ?? "",
    productDescription: product?.productDescription ?? "",
    productSpecification: product?.productSpecification ?? "",
    material: product?.material ?? "",
    finishing: product?.finishing ?? "",
    stock: product ? String(product.stock) : "0",
    minimumOrder: product?.minimumOrder ?? "10 pcs",
    leadTime: product?.leadTime ?? "5-10 hari kerja",
    isBestSeller: product?.isBestSeller ?? false,
    isFeatured: product?.isFeatured ?? false,
    isActive: product?.isActive ?? true,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          categoryId: parseInt(form.categoryId),
          price: parseFloat(form.price),
          thumbnail: form.thumbnail,
          images: form.images,
          shortDescription: form.shortDescription,
          productDescription: form.productDescription,
          productSpecification: form.productSpecification,
          material: form.material,
          finishing: form.finishing,
          stock: parseInt(form.stock) || 0,
          minimumOrder: form.minimumOrder,
          leadTime: form.leadTime,
          isBestSeller: form.isBestSeller,
          isFeatured: form.isFeatured,
          isActive: form.isActive,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengupdate produk");
      }
      onClose();
      onUpdated();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengupdate produk");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setErrorMessage(null); onClose(); } }}>
      <DialogContent className="max-w-2xl sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Edit Produk
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Section 1: Info Utama */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Package className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Info Utama</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">
                Nama Produk <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-categoryId">
                  Kategori <span className="text-red-500">*</span>
                </Label>
                <select
                  id="edit-categoryId"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#C89B5B] focus:ring-offset-2"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">
                  Harga (IDR) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Detail Produk */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Layers className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Detail Produk</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-material">Material</Label>
                <Input
                  id="edit-material"
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-finishing">Finishing</Label>
                <Input
                  id="edit-finishing"
                  name="finishing"
                  value={form.finishing}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stok</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-minimumOrder">Min Order</Label>
                <Input
                  id="edit-minimumOrder"
                  name="minimumOrder"
                  value={form.minimumOrder}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-leadTime">Lead Time</Label>
                <Input
                  id="edit-leadTime"
                  name="leadTime"
                  value={form.leadTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Gambar */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <ImageIcon className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Gambar Produk</h3>
            </div>
            <ImageUpload
              label="Thumbnail"
              value={form.thumbnail}
              onChange={(url) => setForm((prev) => ({ ...prev, thumbnail: url }))}
              onUploadingChange={setThumbnailUploading}
              folder="products"
            />
            <ImageGalleryUpload
              label="Gallery Images"
              value={form.images}
              onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
              onUploadingChange={setGalleryUploading}
              folder="products"
            />
          </div>

          {/* Section 4: Deskripsi */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FileText className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Deskripsi</h3>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shortDescription">Short Description</Label>
              <Input
                id="edit-shortDescription"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-productDescription">Deskripsi Produk</Label>
              <Textarea
                id="edit-productDescription"
                name="productDescription"
                value={form.productDescription}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-productSpecification">Spesifikasi</Label>
              <Textarea
                id="edit-productSpecification"
                name="productSpecification"
                value={form.productSpecification}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          {/* Section 5: Pengaturan */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Settings className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Pengaturan</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between rounded-lg border border-[#E7E3DD] px-4 py-3">
                <Label htmlFor="edit-bestSeller" className="text-sm cursor-pointer">
                  Best Seller
                </Label>
                <Switch
                  id="edit-bestSeller"
                  checked={form.isBestSeller}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isBestSeller: checked }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#E7E3DD] px-4 py-3">
                <Label htmlFor="edit-featured" className="text-sm cursor-pointer">
                  Featured
                </Label>
                <Switch
                  id="edit-featured"
                  checked={form.isFeatured}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))}
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
              disabled={loading || thumbnailUploading || galleryUploading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#C89B5B] hover:bg-[#B08A4A] text-black cursor-pointer"
              disabled={loading || thumbnailUploading || galleryUploading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : thumbnailUploading || galleryUploading ? (
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
