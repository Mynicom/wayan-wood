"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Page } from "@/types/admin";

interface ViewPageDialogProps {
  page: Page | null;
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ViewPageDialog({ page, open, onClose }: ViewPageDialogProps) {
  if (!page) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Page Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Title</p>
              <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">{page.title}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Slug</p>
              <p className="text-[0.9375rem] text-gray-500 font-mono">/{page.slug}</p>
            </div>
          </div>

          <div>
            <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Content</p>
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="text-[0.875rem] text-gray-700 leading-relaxed whitespace-pre-wrap">{page.content}</div>
            </div>
          </div>

          <div className="text-[0.75rem] text-gray-400 pt-2 border-t border-[#E7E3DD]">
            Created: {formatDate(page.createdAt)} · Updated: {formatDate(page.updatedAt)}
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
