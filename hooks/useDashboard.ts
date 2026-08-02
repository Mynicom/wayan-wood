"use client";

import { useState, useEffect } from "react";

export interface DashboardData {
  stats: {
    totalProducts: number;
    totalCategories: number;
    unreadMessages: number;
    totalVisitors: number;
    totalRevenue: number;
    visitorGrowth: number;
    revenueGrowth: number;
  };
  visitors: { month: string; count: number }[];
  revenue: { month: string; amount: number }[];
  popularProducts: {
    id: number;
    name: string;
    category: string;
    views: number;
    orders: number;
    trend: "up" | "down" | "stable";
  }[];
  categories: { name: string; value: number }[];
  activities: {
    id: number;
    type: "message" | "product" | "order" | "settings";
    message: string;
    time: string;
  }[];
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
