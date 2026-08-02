import { mockUsers, MockUser } from "@/lib/mock-data/users";

export async function findManyUsers(): Promise<any[]> {
  return mockUsers.map(({ password, ...user }) => user);
}

export async function findUniqueUser(where: { id?: string; email?: string }): Promise<MockUser | null> {
  if (where.email) {
    return mockUsers.find((u) => u.email === where.email) || null;
  }
  if (where.id) {
    return mockUsers.find((u) => u.id === where.id) || null;
  }
  return null;
}

export async function findUniqueUserSafe(where: { id?: string; email?: string }): Promise<any | null> {
  const user = await findUniqueUser(where);
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

export async function createUser(data: any): Promise<any> {
  const newId = `user-${Date.now()}`;
  const newUser: MockUser = {
    ...data,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockUsers.push(newUser);
  const { password, ...safe } = newUser;
  return safe;
}

export async function updateUser(id: string, data: any): Promise<any | null> {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, data, { updatedAt: new Date() });
  const { password, ...safe } = user;
  return safe;
}

export async function deleteUser(id: string): Promise<boolean> {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) return false;
  mockUsers.splice(index, 1);
  return true;
}

export async function countUsers(): Promise<number> {
  return mockUsers.length;
}
