import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
prisma.user.findMany({
  id: 1,
});
