import { mockPages, MockPage } from "@/lib/mock-data/pages";

export async function findManyPages(): Promise<MockPage[]> {
  return [...mockPages].sort((a, b) => a.title.localeCompare(b.title));
}

export async function findUniquePage(where: { id?: number; slug?: string }): Promise<MockPage | null> {
  if (where.slug) {
    return mockPages.find((p) => p.slug === where.slug) || null;
  }
  if (where.id !== undefined) {
    return mockPages.find((p) => p.id === where.id) || null;
  }
  return null;
}

export async function createPage(data: any): Promise<MockPage> {
  const newId = Math.max(...mockPages.map((p) => p.id)) + 1;
  const newPage: MockPage = {
    ...data,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockPages.push(newPage);
  return newPage;
}

export async function updatePage(id: number, data: any): Promise<MockPage | null> {
  const page = mockPages.find((p) => p.id === id);
  if (!page) return null;
  Object.assign(page, data, { updatedAt: new Date() });
  return page;
}

export async function deletePage(id: number): Promise<boolean> {
  const index = mockPages.findIndex((p) => p.id === id);
  if (index === -1) return false;
  mockPages.splice(index, 1);
  return true;
}
