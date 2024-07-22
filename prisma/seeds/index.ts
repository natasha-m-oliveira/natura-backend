import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export async function runSeed() {
  prisma = new PrismaClient();

  const products = Array.from({ length: 40 }, () => {
    const price = Number(faker.commerce.price()) * 100;

    return {
      id: randomUUID(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price,
      discount: price > 40000 ? Math.trunc(price * 0.2) : null,
    };
  });

  await prisma.$transaction(async (tx) => {
    await tx.product.createMany({
      data: products as any,
    });
  });
}

export async function handleSeedFinish() {
  prisma && (await prisma.$disconnect());
}

runSeed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(handleSeedFinish);
