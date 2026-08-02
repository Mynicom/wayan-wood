"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Product, Category } from "@/types/admin";

const EditProductDialog = dynamic(() => import("@/components/admin/EditProductDialog"), { ssr: false });
const ViewProductDialog = dynamic(() => import("@/components/admin/ViewProductDialog"), { ssr: false });
const DeleteConfirmDialog = dynamic(() => import("@/components/admin/DeleteConfirmDialog"), { ssr: false });

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface ProductTableProps {
  refreshKey?: number;
}

export default function ProductTable({ refreshKey }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products?limit=100"),
        fetch("/api/categories"),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setProducts(productsData.products || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    try {
      await fetch(`/api/products/${deletingProduct.id}`, { method: "DELETE" });
      setDeletingProduct(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#C89B5B]" />
      </div>
    );
  }

  return (
    <>
      {/* MOBILE: card layout */}
      <div className="md:hidden space-y-3">
        {products.map((product) => {
          const category = categories.find((c) => c.id === product.categoryId);
          return (
            <div
              key={product.id}
              className="border border-[#E7E3DD] rounded-xl bg-white p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="56px"


                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1B1B1B] text-[0.9375rem] truncate">
                    {product.name}
                  </p>
                  <p className="text-[0.8125rem] text-gray-500 mt-0.5">
                    {category?.name || "-"}
                  </p>
                  <p className="text-[0.9375rem] font-semibold text-[#C89B5B] mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <StatusBadge
                  label={product.isActive ? "Active" : "Inactive"}
                  variant={product.isActive ? "success" : "danger"}
                />
              </div>
              <div className="flex gap-2 pt-2 border-t border-[#E7E3DD]">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setViewingProduct(product)}
                >
                  <Eye className="w-4 h-4 mr-1.5" />
                  View
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setEditingProduct(product)}
                >
                  <Pencil className="w-4 h-4 mr-1.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setDeletingProduct(product)}
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP: table layout */}
      <div className="hidden md:block border border-[#E7E3DD] rounded-xl bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8F6F2]">
              <TableHead className="w-[80px]">Thumbnail</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Best Seller</TableHead>
              <TableHead className="hidden xl:table-cell text-center">Featured</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const category = categories.find((c) => c.id === product.categoryId);
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"


                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#1B1B1B]">
                    {product.name}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-gray-500">
                    {category?.name || "-"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    <StatusBadge
                      label={product.isBestSeller ? "Yes" : "No"}
                      variant={product.isBestSeller ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-center">
                    <StatusBadge
                      label={product.isFeatured ? "Yes" : "No"}
                      variant={product.isFeatured ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge
                      label={product.isActive ? "Active" : "Inactive"}
                      variant={product.isActive ? "success" : "danger"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => setViewingProduct(product)}
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => setDeletingProduct(product)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ViewProductDialog
        product={viewingProduct}
        open={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
      />
      <EditProductDialog
        product={editingProduct}
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdated={fetchData}
        categories={categories}
      />
      <DeleteConfirmDialog
        open={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product"
        description={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
