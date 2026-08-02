let prisma: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@prisma/client");
  const PrismaClient = mod.PrismaClient;
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} catch {
  prisma = null;
}

export { prisma };
