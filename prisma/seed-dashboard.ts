import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding dashboard data...");

  // ============================================
  // 1. Visitor Data (12 bulan terakhir)
  // ============================================
  const visitorData = [
    { month: 6, year: 2025, count: 1200 },
    { month: 7, year: 2025, count: 1800 },
    { month: 8, year: 2025, count: 2400 },
    { month: 9, year: 2025, count: 2100 },
    { month: 10, year: 2025, count: 3200 },
    { month: 11, year: 2025, count: 4500 },
    { month: 0, year: 2026, count: 3800 },
    { month: 1, year: 2026, count: 2900 },
    { month: 2, year: 2026, count: 4200 },
    { month: 3, year: 2026, count: 5100 },
    { month: 4, year: 2026, count: 4800 },
    { month: 5, year: 2026, count: 5600 },
  ];

  for (const v of visitorData) {
    const date = new Date(v.year, v.month, 15);
    await prisma.visitor.upsert({
      where: { date },
      update: { count: v.count },
      create: { date, count: v.count },
    });
  }
  console.log("Created visitor data:", visitorData.length, "months");

  // ============================================
  // 2. Orders (20 sample orders)
  // ============================================
  const products = await prisma.product.findMany({ take: 12 });
  if (products.length === 0) {
    console.log("No products found. Skipping orders.");
  } else {
    const customers = [
      { name: "Budi Santoso", email: "budi@email.com", phone: "081234567890" },
      { name: "Ayu Lestari", email: "ayu@email.com", phone: "081234567891" },
      { name: "Wayan Ada", email: "wayan@email.com", phone: "081234567892" },
      { name: "Made Wijaya", email: "made@email.com", phone: "081234567893" },
      { name: "Ketut Rai", email: "ketut@email.com", phone: "081234567894" },
    ];

    const statuses = ["pending", "confirmed", "completed", "completed", "completed"];

    for (let i = 0; i < 20; i++) {
      const customer = customers[i % customers.length];
      const numProducts = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, numProducts);

      let totalAmount = 0;
      const orderItems = selectedProducts.map((p) => {
        const quantity = Math.floor(Math.random() * 5) + 1;
        const price = Number(p.price);
        totalAmount += price * quantity;
        return { productId: p.id, quantity, price: p.price };
      });

      const orderDate = new Date(2026, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1);

      const order = await prisma.order.create({
        data: {
          orderNumber: `ORD-${String(1000 + i).padStart(4, "0")}`,
          customerName: customer.name,
          email: customer.email,
          phone: customer.phone,
          totalAmount,
          status: statuses[i % statuses.length],
          createdAt: orderDate,
          items: { create: orderItems },
        },
      });

      // Update product orderCount
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { orderCount: { increment: item.quantity } },
        });
      }
    }
    console.log("Created 20 orders");
  }

  // ============================================
  // 3. Product Views
  // ============================================
  for (const product of products) {
    const views = Math.floor(Math.random() * 1200) + 200;
    await prisma.product.update({
      where: { id: product.id },
      data: { views },
    });
  }
  console.log("Updated product views");

  // ============================================
  // 4. Activity Log
  // ============================================
  const activities = [
    { type: "message", message: "Pesan baru dari Budi Santoso - Custom order meja makan" },
    { type: "product", message: 'Produk "Spice Rack" diperbarui' },
    { type: "order", message: "Pesanan ORD-1001 dikonfirmasi - Rp 3.600.000" },
    { type: "message", message: "Pesan dari Ayu Lestari - Pertanyaan tentang rak bumbu" },
    { type: "settings", message: "Website settings diperbarui" },
    { type: "product", message: 'Produk baru "Cutting Board" ditambahkan' },
    { type: "order", message: "Pesanan ORD-1003 selesai - Rp 1.800.000" },
    { type: "message", message: "Pesan dari Wayan Ada - Feedback produk outdoor" },
    { type: "order", message: "Pesanan ORD-1005 dikonfirmasi - Rp 2.500.000" },
    { type: "product", message: 'Produk "Plant Stand" ditambahkan ke featured' },
  ];

  for (let i = 0; i < activities.length; i++) {
    const hoursAgo = i * 2;
    await prisma.activityLog.create({
      data: {
        type: activities[i].type,
        message: activities[i].message,
        createdAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
      },
    });
  }
  console.log("Created", activities.length, "activity logs");

  console.log("Dashboard seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
