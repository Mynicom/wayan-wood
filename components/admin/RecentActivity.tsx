"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Package, ShoppingCart, Settings } from "lucide-react";
import { useDashboardContext } from "@/components/admin/DashboardProvider";

const typeConfig = {
  message: { icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
  product: { icon: Package, color: "text-emerald-500 bg-emerald-50" },
  order: { icon: ShoppingCart, color: "text-amber-500 bg-amber-50" },
  settings: { icon: Settings, color: "text-gray-500 bg-gray-100" },
};

export default function RecentActivity() {
  const { data, loading } = useDashboardContext();

  if (loading || !data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activities = data.activities;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-[1rem] font-semibold text-[#1B1B1B] mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = typeConfig[activity.type];
            const Icon = config.icon;
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8125rem] text-[#1B1B1B] leading-relaxed">{activity.message}</p>
                  <p className="text-[0.75rem] text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
