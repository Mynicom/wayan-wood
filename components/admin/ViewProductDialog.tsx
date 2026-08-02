"use client";

import Image from "next/image";
import { Package, Layers, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Product } from "@/types/admin";

interface ViewProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ViewProductDialog({ product, open, onClose }: ViewProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Detail Produk
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Section: Gambar */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Layers className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Gambar Produk</h3>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"


              />
            </div>
            {product.images && product.images.length > 0 && (
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-2">
                  Gallery ({product.images.length} gambar)
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img.image}
                        alt={product.name}
                        fill
                        className="object-cover"


                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Info Dasar */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Package className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Info Dasar</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Nama</p>
                <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">{product.name}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Kategori</p>
                <p className="text-[0.9375rem] text-[#1B1B1B]">{product.category?.name || "-"}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Harga</p>
                <p className="text-[0.9375rem] font-semibold text-[#C89B5B]">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Slug</p>
                <p className="text-[0.9375rem] text-gray-500 font-mono">{product.slug}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Material</p>
                <p className="text-[0.9375rem] text-[#1B1B1B]">{product.material || "-"}</p>
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Stok</p>
                <p className="text-[0.9375rem] text-[#1B1B1B]">{product.stock}</p>
              </div>
            </div>
          </div>

          {/* Section: Deskripsi */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <FileText className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Deskripsi</h3>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Short Description</p>
              <p className="text-[0.875rem] text-[#1B1B1B]">{product.shortDescription}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Deskripsi Produk</p>
              <p className="text-[0.875rem] text-gray-600 leading-relaxed whitespace-pre-wrap">{product.productDescription}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Spesifikasi</p>
              <p className="text-[0.875rem] text-gray-600">{product.productSpecification}</p>
            </div>
          </div>

          {/* Section: Status & Info */}
          <div className="rounded-xl border border-[#E7E3DD] bg-white p-5 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Clock className="w-5 h-5 text-[#C89B5B]" />
              <h3 className="font-semibold text-[0.9375rem]">Status & Informasi</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <StatusBadge label={`Best Seller: ${product.isBestSeller ? "Ya" : "Tidak"}`} variant={product.isBestSeller ? "success" : "default"} />
              <StatusBadge label={`Featured: ${product.isFeatured ? "Ya" : "Tidak"}`} variant={product.isFeatured ? "success" : "default"} />
              <StatusBadge label={product.isActive ? "Active" : "Inactive"} variant={product.isActive ? "success" : "danger"} />
            </div>
            <div className="text-[0.8125rem] text-gray-500">
              Dibuat: {formatDate(product.createdAt)} · Diperbarui: {formatDate(product.updatedAt)}
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
