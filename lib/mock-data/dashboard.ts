export interface DashboardVisitor {
  month: string;
  count: number;
}

export interface DashboardRevenue {
  month: string;
  amount: number;
}

export interface DashboardPopularProduct {
  id: number;
  name: string;
  category: string;
  views: number;
  orders: number;
  trend: "up" | "stable" | "down";
}

export interface DashboardCategory {
  name: string;
  value: number;
}

export interface DashboardActivity {
  id: number;
  type: string;
  message: string;
  time: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  unreadMessages: number;
  totalVisitors: number;
  totalRevenue: number;
  visitorGrowth: number;
  revenueGrowth: number;
}

export interface DashboardData {
  stats: DashboardStats;
  visitors: DashboardVisitor[];
  revenue: DashboardRevenue[];
  popularProducts: DashboardPopularProduct[];
  categories: DashboardCategory[];
  activities: DashboardActivity[];
}

export const mockDashboardData: DashboardData = {
  stats: {
    totalProducts: 12,
    totalCategories: 4,
    unreadMessages: 4,
    totalVisitors: 12500,
    totalRevenue: 19,
    visitorGrowth: 12.5,
    revenueGrowth: 8.3,
  },
  visitors: [
    { month: "Feb", count: 800 },
    { month: "Mar", count: 950 },
    { month: "Apr", count: 1100 },
    { month: "Mei", count: 1000 },
    { month: "Jun", count: 1200 },
    { month: "Jul", count: 1350 },
    { month: "Ags", count: 1150 },
    { month: "Sep", count: 1050 },
    { month: "Okt", count: 1300 },
    { month: "Nov", count: 1400 },
    { month: "Des", count: 1200 },
    { month: "Jan", count: 1000 },
  ],
  revenue: [
    { month: "Feb", amount: 1 },
    { month: "Mar", amount: 2 },
    { month: "Apr", amount: 2 },
    { month: "Mei", amount: 1 },
    { month: "Jun", amount: 2 },
    { month: "Jul", amount: 3 },
    { month: "Ags", amount: 2 },
    { month: "Sep", amount: 1 },
    { month: "Okt", amount: 2 },
    { month: "Nov", amount: 2 },
    { month: "Des", amount: 1 },
    { month: "Jan", amount: 2 },
  ],
  popularProducts: [
    { id: 1, name: "Spice Rack", category: "Kitchen", views: 150, orders: 12, trend: "up" },
    { id: 12, name: "Plant Stand", category: "Outdoor", views: 160, orders: 16, trend: "up" },
    { id: 2, name: "Cutting Board", category: "Kitchen", views: 200, orders: 18, trend: "up" },
    { id: 4, name: "Wooden Tray Cart", category: "Bathroom", views: 180, orders: 14, trend: "up" },
    { id: 10, name: "Storage Basket", category: "Living Room", views: 140, orders: 13, trend: "up" },
    { id: 9, name: "Towel Rack", category: "Bathroom", views: 130, orders: 11, trend: "up" },
    { id: 3, name: "Serving Tray", category: "Kitchen", views: 120, orders: 15, trend: "up" },
    { id: 6, name: "Luxury Tray", category: "Bathroom", views: 110, orders: 9, trend: "stable" },
  ],
  categories: [
    { name: "Kitchen", value: 25 },
    { name: "Bathroom", value: 50 },
    { name: "Living Room", value: 17 },
    { name: "Outdoor", value: 8 },
  ],
  activities: [
    { id: 1, type: "order", message: "Pesanan baru ORD-020 dari Angga Prasetyo", time: "23 hari lalu" },
    { id: 2, type: "product", message: 'Produk baru "Plant Stand" ditambahkan', time: "25 hari lalu" },
    { id: 3, type: "message", message: "Pesan baru dari Maya Putri - Custom Design", time: "28 hari lalu" },
    { id: 4, type: "order", message: "Pesanan baru ORD-019 dari Taufik Rahman", time: "1 bulan lalu" },
    { id: 5, type: "product", message: 'Produk "Spice Rack" diperbarui', time: "1 bulan lalu" },
    { id: 6, type: "settings", message: "Website settings diperbarui", time: "2 bulan lalu" },
    { id: 7, type: "message", message: "Pesan baru dari Budi Santoso - Custom Order", time: "2 bulan lalu" },
    { id: 8, type: "order", message: "Pesanan baru ORD-001 dari Budi Santoso", time: "7 bulan lalu" },
    { id: 9, type: "product", message: 'Produk baru "Cutting Board" ditambahkan', time: "8 bulan lalu" },
    { id: 10, type: "product", message: 'Produk baru "Spice Rack" ditambahkan', time: "9 bulan lalu" },
  ],
};
