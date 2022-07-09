import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const flowbite = await prisma.library.findUnique({
    where: {
      title: 'Flowbite React',
    },
    include: {
      components: true,
    },
  });
  console.log(flowbite);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
