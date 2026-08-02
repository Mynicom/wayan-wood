"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
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
import type { Page } from "@/types/admin";

interface EditPageDialogProps {
  page: Page | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditPageDialog({ page, open, onClose, onUpdated }: EditPageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
  });

  useEffect(() => {
    if (page) {
      setForm({
        title: page.title,
        slug: page.slug,
        content: page.content,
      });
    }
  }, [page]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          content: form.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update page");
      }
      onClose();
      onUpdated();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update page");
    } finally {
      setLoading(false);
    }
  };

  if (!page) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setErrorMessage(null); onClose(); } }}>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Edit Page
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title *</Label>
            <Input
              id="edit-title"
              name="title"
              value={form.title}
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

          <div className="space-y-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
            />
          </div>

          {errorMessage && (
            <p className="text-[0.8125rem] text-red-500">{errorMessage}</p>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E7E3DD]">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#C89B5B] hover:bg-[#B08A4A] text-black cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Page"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
