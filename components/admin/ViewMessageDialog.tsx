"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/admin/StatusBadge";
import type { ContactMessage } from "@/types/admin";

interface ViewMessageDialogProps {
  message: ContactMessage | null;
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ViewMessageDialog({ message, open, onClose }: ViewMessageDialogProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            Message Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Name</p>
              <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">{message.name}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-[0.9375rem] text-[#1B1B1B]">{message.email}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Phone</p>
              <p className="text-[0.9375rem] text-[#1B1B1B]">{message.phone}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Status</p>
              <StatusBadge
                label={message.status === "read" ? "Read" : "Unread"}
                variant={message.status === "read" ? "success" : "warning"}
              />
            </div>
          </div>

          <div>
            <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Subject</p>
            <p className="text-[0.9375rem] font-medium text-[#1B1B1B]">{message.subject}</p>
          </div>

          <div>
            <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide mb-1">Message</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-[0.875rem] text-gray-700 leading-relaxed whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>

          <div className="text-[0.75rem] text-gray-400 pt-2 border-t border-[#E7E3DD]">
            Received: {formatDate(message.createdAt)}
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
