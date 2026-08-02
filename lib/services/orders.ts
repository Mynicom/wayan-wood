import { mockOrders, MockOrder, getNextOrderId, getNextOrderItemId } from "@/lib/mock-data/orders";

interface OrderQueryOptions {
  where?: Record<string, any>;
  include?: {
    items?: any;
  };
  orderBy?: Record<string, string>;
  take?: number;
  skip?: number;
}

function matchesWhere(order: MockOrder, where: Record<string, any>): boolean {
  for (const [key, value] of Object.entries(where)) {
    if (key === "status" && order.status !== value) return false;
    if (key === "id" && order.id !== value) return false;
    if (key === "orderNumber" && order.orderNumber !== value) return false;
  }
  return true;
}

export async function findManyOrders(options: OrderQueryOptions = {}): Promise<any[]> {
  const { where = {}, orderBy, take, skip } = options;
  let filtered = mockOrders.filter((o) => matchesWhere(o, where));
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

export async function countOrders(where: Record<string, any> = {}): Promise<number> {
  return mockOrders.filter((o) => matchesWhere(o, where)).length;
}

export async function findUniqueOrder(where: { id?: number; orderNumber?: string }): Promise<any | null> {
  if (where.id !== undefined) {
    return mockOrders.find((o) => o.id === where.id) || null;
  }
  if (where.orderNumber) {
    return mockOrders.find((o) => o.orderNumber === where.orderNumber) || null;
  }
  return null;
}

export async function createOrder(data: any): Promise<any> {
  const newId = getNextOrderId();
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const items = (data.items || []).map((item: any, idx: number) => ({
    id: getNextOrderItemId(),
    orderId: newId,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    product: { name: `Product ${item.productId}`, thumbnail: "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=360&h=480&fit=crop" },
  }));

  const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const newOrder: MockOrder = {
    id: newId,
    orderNumber,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    totalAmount,
    notes: data.notes || "",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    items,
  };

  mockOrders.unshift(newOrder);
  return newOrder;
}

export async function updateOrder(id: number, data: any): Promise<any | null> {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) return null;
  if (data.status !== undefined) order.status = data.status;
  if (data.notes !== undefined) order.notes = data.notes;
  order.updatedAt = new Date();
  return order;
}
