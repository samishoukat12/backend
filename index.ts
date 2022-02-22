import { PrismaClient } from '@prisma/client';
import express from 'express';
const prisma = new PrismaClient();
const app = express();
const PORT = 4000;
async function main() {
  await prisma.$connect();
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);

  const addUsers = await prisma.users.create({
    name: 'tayyab',
    lastName: 'shoukat ali',
    rollNo: '10',
    password: '1234iuiu',
  });
  console.log(`data entred is ${addUsers}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(PORT, () => {
  console.log('server is working');
});
