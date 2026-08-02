"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useDashboardContext } from "@/components/admin/DashboardProvider";

export default function PopularProducts() {
  const { data, loading } = useDashboardContext();

  if (loading || !data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const products = data.popularProducts;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-[1rem] font-semibold text-[#1B1B1B] mb-4">Produk Populer</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-[#E7E3DD]">
                <th className="text-left py-3 pr-4 text-gray-500 font-medium">Produk</th>
                <th className="text-left py-3 pr-4 text-gray-500 font-medium">Kategori</th>
                <th className="text-right py-3 pr-4 text-gray-500 font-medium">Views</th>
                <th className="text-right py-3 pr-4 text-gray-500 font-medium">Orders</th>
                <th className="text-right py-3 text-gray-500 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[#E7E3DD] last:border-0">
                  <td className="py-3 pr-4 font-medium text-[#1B1B1B]">{product.name}</td>
                  <td className="py-3 pr-4 text-gray-500">{product.category}</td>
                  <td className="py-3 pr-4 text-right text-gray-600">{new Intl.NumberFormat("id-ID").format(product.views)}</td>
                  <td className="py-3 pr-4 text-right text-gray-600">{product.orders}</td>
                  <td className="py-3 text-right">
                    {product.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500 inline" />}
                    {product.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400 inline" />}
                    {product.trend === "stable" && <Minus className="w-4 h-4 text-gray-400 inline" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
