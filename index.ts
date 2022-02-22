import { PrismaClient } from '@prisma/client';
import express from 'express';
import {data1} from './src/data'
const prisma = new PrismaClient();
const app = express();
const PORT = 4000;
async function main() {
  await prisma.$connect();
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
  console.dir(allUsers, { depth: null });
  setData();
}

const setData = async () => {
  const addUsers = await prisma.users.create(data1);
  console.log(`data entred is ${addUsers}`);
};

main().catch((e) => {
  throw e;
});

app.listen(PORT, () => {
  console.log('server is working');
});
