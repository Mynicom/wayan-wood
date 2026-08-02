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
import type { Category } from "@/types/admin";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  categories: Category[];
  trigger?: React.ReactNode;
}

export default function AddProductDialog({
  open,
  onClose,
  onCreated,
  categories,
  trigger,
}: AddProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: "",
    thumbnail: "",
    images: [] as string[],
    shortDescription: "",
    productDescription: "",
    productSpecification: "",
    material: "",
    finishing: "",
    stock: "0",
    minimumOrder: "10 pcs",
    leadTime: "5-10 hari kerja",
    isBestSeller: false,
    isFeatured: false,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug,
          categoryId: parseInt(form.categoryId),
          price: parseFloat(form.price),
          thumbnail: form.thumbnail || "https://placehold.co/400x500?text=No+Image",
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
        throw new Error(data.error || "Failed to create product");
      }
      setForm({
        name: "",
        categoryId: "",
        price: "",
        thumbnail: "",
        images: [],
        shortDescription: "",
        productDescription: "",
        productSpecification: "",
        material: "",
        finishing: "",
        stock: "0",
        minimumOrder: "10 pcs",
        leadTime: "5-10 hari kerja",
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
      });
      onClose();
      onCreated();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setErrorMessage(null); onClose(); } }}>
      {trigger}
      <DialogContent className="max-w-2xl sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Add New Product
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
              <Label htmlFor="name">
                Nama Produk <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">
                  Kategori <span className="text-red-500">*</span>
                </Label>
                <select
                  id="categoryId"
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
                <Label htmlFor="price">
                  Harga (IDR) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
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
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                  placeholder="e.g. Oak Wood, Teak Wood"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finishing">Finishing</Label>
                <Input
                  id="finishing"
                  name="finishing"
                  value={form.finishing}
                  onChange={handleChange}
                  placeholder="e.g. Natural Wood Polish"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumOrder">Min Order</Label>
                <Input
                  id="minimumOrder"
                  name="minimumOrder"
                  value={form.minimumOrder}
                  onChange={handleChange}
                  placeholder="10 pcs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadTime">Lead Time</Label>
                <Input
                  id="leadTime"
                  name="leadTime"
                  value={form.leadTime}
                  onChange={handleChange}
                  placeholder="5-10 hari kerja"
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
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Deskripsi singkat produk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDescription">Deskripsi Produk</Label>
              <Textarea
                id="productDescription"
                name="productDescription"
                value={form.productDescription}
                onChange={handleChange}
                placeholder="Deskripsi lengkap produk"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productSpecification">Spesifikasi</Label>
              <Textarea
                id="productSpecification"
                name="productSpecification"
                value={form.productSpecification}
                onChange={handleChange}
                placeholder="Material, dimensi, berat, dll."
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
                <Label htmlFor="bestSeller" className="text-sm cursor-pointer">
                  Best Seller
                </Label>
                <Switch
                  id="bestSeller"
                  checked={form.isBestSeller}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isBestSeller: checked }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#E7E3DD] px-4 py-3">
                <Label htmlFor="featured" className="text-sm cursor-pointer">
                  Featured
                </Label>
                <Switch
                  id="featured"
                  checked={form.isFeatured}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#E7E3DD] px-4 py-3">
                <Label htmlFor="active" className="text-sm cursor-pointer">
                  Active
                </Label>
                <Switch
                  id="active"
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
                "Simpan Produk"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
