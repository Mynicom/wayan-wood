"use client";

import { useState, useEffect, useCallback } from "react";
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
import type { Page } from "@/types/admin";

const EditPageDialog = dynamic(() => import("@/components/admin/EditPageDialog"), { ssr: false });
const ViewPageDialog = dynamic(() => import("@/components/admin/ViewPageDialog"), { ssr: false });
const DeleteConfirmDialog = dynamic(() => import("@/components/admin/DeleteConfirmDialog"), { ssr: false });

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PageTable() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [viewingPage, setViewingPage] = useState<Page | null>(null);
  const [deletingPage, setDeletingPage] = useState<Page | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setPages(data || []);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deletingPage) return;
    setDeleting(true);
    try {
      await fetch(`/api/pages/${deletingPage.id}`, { method: "DELETE" });
      setDeletingPage(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete page:", error);
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
      <div className="border border-[#E7E3DD] rounded-xl bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8F6F2]">
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Slug</TableHead>
              <TableHead className="hidden md:table-cell">Updated</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium text-[#1B1B1B]">
                  {page.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-500 font-mono text-[0.8125rem]">
                  /{page.slug}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500 text-[0.8125rem]">
                  {formatDate(page.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setViewingPage(page)}
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setEditingPage(page)}
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeletingPage(page)}
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

      <ViewPageDialog
        page={viewingPage}
        open={!!viewingPage}
        onClose={() => setViewingPage(null)}
      />
      <EditPageDialog
        page={editingPage}
        open={!!editingPage}
        onClose={() => setEditingPage(null)}
        onUpdated={fetchData}
      />
      <DeleteConfirmDialog
        open={!!deletingPage}
        onClose={() => setDeletingPage(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Page"
        description={`Are you sure you want to delete "${deletingPage?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
