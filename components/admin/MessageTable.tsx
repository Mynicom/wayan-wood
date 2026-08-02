"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Eye, Trash2, Loader2 } from "lucide-react";
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
import type { ContactMessage } from "@/types/admin";

const ViewMessageDialog = dynamic(() => import("@/components/admin/ViewMessageDialog"), { ssr: false });
const DeleteConfirmDialog = dynamic(() => import("@/components/admin/DeleteConfirmDialog"), { ssr: false });

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MessageTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/messages?limit=100");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deletingMessage) return;
    setDeleting(true);
    try {
      await fetch(`/api/messages/${deletingMessage.id}`, { method: "DELETE" });
      setDeletingMessage(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleRead = async (message: ContactMessage) => {
    try {
      await fetch(`/api/messages/${message.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: message.status === "read" ? "unread" : "read",
        }),
      });
      fetchData();
    } catch (error) {
      console.error("Failed to toggle message status:", error);
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
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium text-[#1B1B1B]">
                  {message.name}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500">
                  {message.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-500">
                  {message.phone}
                </TableCell>
                <TableCell className="text-gray-500">{message.subject}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleToggleRead(message)}
                    className="cursor-pointer"
                  >
                    <StatusBadge
                      label={message.status === "read" ? "Read" : "Unread"}
                      variant={message.status === "read" ? "success" : "warning"}
                    />
                  </button>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500 text-[0.8125rem]">
                  {formatDate(message.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setViewingMessage(message)}
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeletingMessage(message)}
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

      <ViewMessageDialog
        message={viewingMessage}
        open={!!viewingMessage}
        onClose={() => setViewingMessage(null)}
      />
      <DeleteConfirmDialog
        open={!!deletingMessage}
        onClose={() => setDeletingMessage(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Message"
        description={`Are you sure you want to delete this message from "${deletingMessage?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
