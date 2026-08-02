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
import type { Category } from "@/types/admin";

const EditCategoryDialog = dynamic(() => import("@/components/admin/EditCategoryDialog"), { ssr: false });
const ViewCategoryDialog = dynamic(() => import("@/components/admin/ViewCategoryDialog"), { ssr: false });
const DeleteConfirmDialog = dynamic(() => import("@/components/admin/DeleteConfirmDialog"), { ssr: false });

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deletingCategory) return;
    setDeleting(true);
    try {
      await fetch(`/api/categories/${deletingCategory.id}`, { method: "DELETE" });
      setDeletingCategory(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete category:", error);
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
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-[#E7E3DD] rounded-xl bg-white p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="56px"


                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1B1B1B] text-[0.9375rem] truncate">
                  {category.name}
                </p>
                <p className="text-[0.8125rem] text-gray-500 font-mono mt-0.5 truncate">
                  /{category.slug}
                </p>
              </div>
              <StatusBadge
                label={category.isActive ? "Active" : "Inactive"}
                variant={category.isActive ? "success" : "danger"}
              />
            </div>
            <div className="flex gap-2 pt-2 border-t border-[#E7E3DD]">
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => setViewingCategory(category)}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={() => setEditingCategory(category)}
              >
                <Pencil className="w-4 h-4 mr-1.5" />
                Edit
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setDeletingCategory(category)}
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: table layout */}
      <div className="hidden md:block border border-[#E7E3DD] rounded-xl bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8F6F2]">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden lg:table-cell">Slug</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Products</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="48px"


                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[#1B1B1B]">
                  {category.name}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-500 font-mono text-[0.8125rem]">
                  {category.slug}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-center text-gray-500">
                  {category.productCount ?? 0}
                </TableCell>
                <TableCell className="text-center">
                  <StatusBadge
                    label={category.isActive ? "Active" : "Inactive"}
                    variant={category.isActive ? "success" : "danger"}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setViewingCategory(category)}
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeletingCategory(category)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ViewCategoryDialog
        category={viewingCategory}
        open={!!viewingCategory}
        onClose={() => setViewingCategory(null)}
      />
      <EditCategoryDialog
        category={editingCategory}
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        onUpdated={fetchData}
      />
      <DeleteConfirmDialog
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
