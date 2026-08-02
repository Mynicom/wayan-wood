"use client";

import dynamic from "next/dynamic";

const MessageTable = dynamic(() => import("@/components/admin/MessageTable"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-[#C89B5B] border-t-transparent rounded-full animate-spin" /></div>,
});

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-bold text-[#1B1B1B]">
          Contact Messages
        </h2>
        <p className="text-gray-500 text-[0.875rem] mt-1">
          View and manage customer inquiries
        </p>
      </div>
      <MessageTable />
    </div>
  );
}
