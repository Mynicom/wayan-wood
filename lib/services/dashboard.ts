import { mockDashboardData, DashboardData } from "@/lib/mock-data/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  return JSON.parse(JSON.stringify(mockDashboardData));
}
