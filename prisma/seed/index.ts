import { PrismaClient } from '@prisma/client';

import { chakra } from './chakra';
import { daisyUI } from './daisy-ui';
import { flowbite } from './flowbite';
import { materialUI } from './material-ui';
import { reactBootstrap } from './react-bootstrap';
import { nextUI } from './next-ui';

const prisma = new PrismaClient();

type LibraryType =
  | 'ChakraUI'
  | 'DaisyUI'
  | 'Flowbite React'
  | 'Material UI'
  | 'NextUI'
  | 'React Bootstrap';

const libraryList: Record<LibraryType, string[]> = {
  'Flowbite React': flowbite,
  'Material UI': materialUI,
  NextUI: nextUI,
  'React Bootstrap': reactBootstrap,
  ChakraUI: chakra,
  DaisyUI: daisyUI,
};

async function main() {
  for (const library in libraryList) {
    await prisma.library.upsert({
      where: { title: library },
      update: {},
      create: {
        title: library,
        components: {
          create: libraryList[library as LibraryType].map((el) => {
            return {
              name: el,
            };
          }),
        },
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
