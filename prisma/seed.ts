import { PrismaClient } from '@prisma/client';
import { flowbite } from './flowbite';
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

  for await (const name of flowbite) {
    await prisma.component.create({
      data: {
        name,
        libraryTitle: 'Flowbite React',
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
