"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useDashboardContext } from "@/components/admin/DashboardProvider";

const COLORS = ["#C89B5B", "#3B2A1F", "#B08A4A", "#666666", "#E7E3DD"];

export default function CategoryChart() {
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

  const chartData = data.categories;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-[1rem] font-semibold text-[#1B1B1B] mb-4">Distribusi Kategori</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E7E3DD",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}%`, "Persentase"]}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-[0.8125rem] text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
