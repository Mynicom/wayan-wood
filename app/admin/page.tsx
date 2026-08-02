"use client";

import dynamic from "next/dynamic";
import DashboardCards from "@/components/admin/DashboardCards";
import PopularProducts from "@/components/admin/PopularProducts";
import RecentActivity from "@/components/admin/RecentActivity";
import { DashboardProvider } from "@/components/admin/DashboardProvider";

const VisitorChart = dynamic(() => import("@/components/admin/VisitorChart"), {
  ssr: false,
  loading: () => <div className="h-[352px] bg-white rounded-xl animate-pulse" />,
});

const RevenueChart = dynamic(() => import("@/components/admin/RevenueChart"), {
  ssr: false,
  loading: () => <div className="h-[352px] bg-white rounded-xl animate-pulse" />,
});

const CategoryChart = dynamic(() => import("@/components/admin/CategoryChart"), {
  ssr: false,
  loading: () => <div className="h-[352px] bg-white rounded-xl animate-pulse" />,
});

export default function AdminDashboardPage() {
  return (
    <DashboardProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-[1.5rem] font-bold text-[#1B1B1B]">Dashboard</h2>
          <p className="text-gray-500 text-[0.875rem] mt-1">
            Welcome back, Admin. Berikut ringkasan toko Anda.
          </p>
        </div>

        <DashboardCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VisitorChart />
          <RevenueChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PopularProducts />
          </div>
          <CategoryChart />
        </div>

        <RecentActivity />
      </div>
    </DashboardProvider>
  );
}
