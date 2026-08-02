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
import type { User } from "@/types/admin";

const EditUserDialog = dynamic(() => import("@/components/admin/EditUserDialog"), { ssr: false });
const ViewUserDialog = dynamic(() => import("@/components/admin/ViewUserDialog"), { ssr: false });
const DeleteConfirmDialog = dynamic(() => import("@/components/admin/DeleteConfirmDialog"), { ssr: false });

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!deletingUser) return;
    setDeleting(true);
    try {
      await fetch(`/api/users/${deletingUser.id}`, { method: "DELETE" });
      setDeletingUser(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete user:", error);
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
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-[#1B1B1B]">
                  {user.name || "-"}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-500">{user.email}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.role === "super_admin"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200"
                  }`}>
                    {user.role === "super_admin" ? "Super Admin" : "Admin"}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500 text-[0.8125rem]">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setViewingUser(user)}
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setEditingUser(user)}
                    >
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeletingUser(user)}
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

      <ViewUserDialog
        user={viewingUser}
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
      />
      <EditUserDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onUpdated={fetchData}
      />
      <DeleteConfirmDialog
        open={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete User"
        description={`Are you sure you want to delete "${deletingUser?.name || deletingUser?.email}"? This action cannot be undone.`}
      />
    </>
  );
}
