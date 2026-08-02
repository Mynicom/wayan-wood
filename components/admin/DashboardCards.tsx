"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, FolderTree, Mail, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useDashboardContext } from "@/components/admin/DashboardProvider";

export default function DashboardCards() {
  const { data, loading } = useDashboardContext();

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { stats } = data;

  const cards = [
    {
      title: "Total Produk",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Kategori",
      value: stats.totalCategories,
      icon: FolderTree,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pesan Belum Dibaca",
      value: stats.unreadMessages,
      icon: Mail,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Pengunjung",
      value: new Intl.NumberFormat("id-ID").format(stats.totalVisitors),
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      growth: stats.visitorGrowth,
    },
    {
      title: "Total Pendapatan",
      value: `Rp ${stats.totalRevenue} Jt`,
      icon: DollarSign,
      color: "bg-rose-50 text-rose-600",
      growth: stats.revenueGrowth,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.8125rem] text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-[1.5rem] font-bold text-[#1B1B1B] mt-1">
                    {stat.value}
                  </p>
                  {"growth" in stat && stat.growth !== undefined && (
                    <div className="flex items-center gap-1 mt-1">
                      {stat.growth >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-[0.75rem] font-medium ${stat.growth >= 0 ? "text-emerald-500" : "text-red-400"}`}>
                        {stat.growth >= 0 ? "+" : ""}{stat.growth}%
                      </span>
                      <span className="text-[0.75rem] text-gray-400">vs bulan lalu</span>
                    </div>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
