import { mockMessages, MockContactMessage, getNextMessageId } from "@/lib/mock-data/messages";

interface MessageQueryOptions {
  where?: Record<string, any>;
  orderBy?: Record<string, string>;
  take?: number;
  skip?: number;
}

function matchesWhere(msg: MockContactMessage, where: Record<string, any>): boolean {
  for (const [key, value] of Object.entries(where)) {
    if (key === "status" && msg.status !== value) return false;
    if (key === "id" && msg.id !== value) return false;
  }
  return true;
}

export async function findManyMessages(options: MessageQueryOptions = {}): Promise<any[]> {
  const { where = {}, orderBy, take, skip } = options;
  let filtered = mockMessages.filter((m) => matchesWhere(m, where));
  if (orderBy) {
    const entries = Object.entries(orderBy);
    filtered.sort((a, b) => {
      for (const [field, direction] of entries) {
        const aVal = (a as any)[field];
        const bVal = (b as any)[field];
        if (aVal === undefined || bVal === undefined) continue;
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  if (skip) filtered = filtered.slice(skip);
  if (take) filtered = filtered.slice(0, take);
  return filtered;
}

export async function countMessages(where: Record<string, any> = {}): Promise<number> {
  return mockMessages.filter((m) => matchesWhere(m, where)).length;
}

export async function findUniqueMessage(where: { id?: number }): Promise<MockContactMessage | null> {
  if (where.id !== undefined) {
    return mockMessages.find((m) => m.id === where.id) || null;
  }
  return null;
}

export async function createMessage(data: any): Promise<MockContactMessage> {
  const newId = getNextMessageId();
  const newMessage: MockContactMessage = {
    id: newId,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    subject: data.subject || "",
    message: data.message,
    status: "unread",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockMessages.unshift(newMessage);
  return newMessage;
}

export async function updateMessage(id: number, data: any): Promise<MockContactMessage | null> {
  const msg = mockMessages.find((m) => m.id === id);
  if (!msg) return null;
  if (data.status !== undefined) msg.status = data.status;
  msg.updatedAt = new Date();
  return msg;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const index = mockMessages.findIndex((m) => m.id === id);
  if (index === -1) return false;
  mockMessages.splice(index, 1);
  return true;
}
