import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getData = async () => {
  const allUsers = await prisma.user.findMany({
    where: { name: 'sami' },
  })
  console.log(allUsers);
};
