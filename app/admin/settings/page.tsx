"use client";

import SettingsCard from "@/components/admin/SettingsCard";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-bold text-[#1B1B1B]">
          Website Settings
        </h2>
        <p className="text-gray-500 text-[0.875rem] mt-1">
          Configure your website information
        </p>
      </div>
      <SettingsCard />
    </div>
  );
}
