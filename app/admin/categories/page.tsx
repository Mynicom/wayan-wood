"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryTable = dynamic(() => import("@/components/admin/CategoryTable"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-[#C89B5B] border-t-transparent rounded-full animate-spin" /></div>,
});
const AddCategoryDialog = dynamic(() => import("@/components/admin/AddCategoryDialog"), { ssr: false });

export default function AdminCategoriesPage() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-[1.5rem] font-bold text-[#1B1B1B]">Categories</h2>
          <p className="text-gray-500 text-[0.875rem] mt-1">
            Manage your product categories
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="bg-[#C89B5B] hover:bg-[#B08A4A] text-black cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
      <CategoryTable />
      <AddCategoryDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={() => setAddOpen(false)}
      />
    </div>
  );
}
