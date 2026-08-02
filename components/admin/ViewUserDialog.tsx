"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusBadge from "@/components/admin/StatusBadge";
import type { User } from "@/types/admin";

interface ViewUserDialogProps {
  user: User | null;
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

export default function ViewUserDialog({ user, open, onClose }: ViewUserDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B1B1B] text-[1.25rem]">
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-[#C89B5B] flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <p className="text-[1.125rem] font-semibold text-[#1B1B1B]">{user.name}</p>
              <p className="text-[0.875rem] text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Role</p>
              <StatusBadge
                label={user.role === "super_admin" ? "Super Admin" : "Admin"}
                variant={user.role === "super_admin" ? "warning" : "default"}
              />
            </div>
            <div>
              <p className="text-[0.75rem] text-gray-400 uppercase tracking-wide">Created</p>
              <p className="text-[0.875rem] text-[#1B1B1B]">{formatDate(user.createdAt)}</p>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#E7E3DD]">
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
