import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const setData = async () => {
  await prisma.user.create({
    data: {
      name: 'sami',
      email: 'samishokat@gmail.com',
      role: 'STUDENT',
      password:"12345622",
      address:'abc'
    },
  });
};
