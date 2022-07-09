import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const libraries = [
  'DaisyUI',
  'React Bootstrap',
  'ChakraUI',
  'Tailwind UI',
  'Flowbite React',
  'Material UI',
];

async function main() {
  for await (const title of libraries) {
    await prisma.library.upsert({
      where: { title },
      update: {},
      create: {
        title,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
