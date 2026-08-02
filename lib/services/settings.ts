import { mockSettings, MockWebsiteSettings } from "@/lib/mock-data/settings";

export async function getSettings(): Promise<MockWebsiteSettings> {
  return { ...mockSettings };
}

export async function updateSettings(data: Partial<MockWebsiteSettings>): Promise<MockWebsiteSettings> {
  Object.assign(mockSettings, data, { updatedAt: new Date() });
  return { ...mockSettings };
}
