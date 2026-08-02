"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardContext } from "@/components/admin/DashboardProvider";

export default function RevenueChart() {
  const { data, loading } = useDashboardContext();

  if (loading || !data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[280px] bg-gray-100 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-[1rem] font-semibold text-[#1B1B1B] mb-4">Pendapatan (Juta Rp)</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.revenue} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E3DD" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#666666" }}
                axisLine={{ stroke: "#E7E3DD" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#666666" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E7E3DD",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`Rp ${value} Juta`, "Pendapatan"]}
              />
              <Bar
                dataKey="amount"
                fill="#C89B5B"
                radius={[4, 4, 0, 0]}
                name="Pendapatan"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
