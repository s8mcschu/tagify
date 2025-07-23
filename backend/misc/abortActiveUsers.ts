import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    where: { finished: null },
    data: {
      aborted: true
    }
  });
}

main();
