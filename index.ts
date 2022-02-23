import { PrismaClient } from '@prisma/client';
import express from 'express';
const PORT = 8000;
const prisma = new PrismaClient();
const app = express();
async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  setData();
}

const setData = async () => {
  await prisma.user.create({
    data: {
      name: 'sami',
      email: 'samishoukat123@gmail.com',
      roles: {
        create: {
          title: 'student',
          students: {
            create: {
              name: 'sami',
              lastName: 'shoukat',
              rollNo: '123',
            },
          },
          teachers: {
            create: {
              name: 'sami',
              lastName: 'shoukat',
            },
          },
        },
      },
      sessions: {
        create: {
          session: '2020 to 2024',
        },
      },
    },
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
app.listen(PORT, () => {
  console.log(`server is running at ${PORT} port`);
});
