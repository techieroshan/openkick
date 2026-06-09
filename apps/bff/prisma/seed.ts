import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Categories
  const consumer = await prisma.category.upsert({
    where: { slug: "consumer" },
    update: {},
    create: {
      slug: "consumer",
      name: "Consumer Protection",
    },
  });

  const privacy = await prisma.category.upsert({
    where: { slug: "privacy" },
    update: {},
    create: {
      slug: "privacy",
      name: "Data Privacy",
    },
  });

  const automotive = await prisma.category.upsert({
    where: { slug: "automotive" },
    update: {},
    create: {
      slug: "automotive",
      name: "Automotive",
    },
  });

  const employment = await prisma.category.upsert({
    where: { slug: "employment" },
    update: {},
    create: {
      slug: "employment",
      name: "Employment",
    },
  });

  // Cases (Settlements)
  await prisma.case.upsert({
    where: { slug: "vehicle-fuel-economy" },
    update: {},
    create: {
      slug: "vehicle-fuel-economy",
      title: "Vehicle Fuel Economy Settlement",
      defendants: "Auto Giant Corp",
      jurisdiction: "Federal",
      status: "open",
      categoryId: consumer.id, // Fixed mapping
      claimDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      proofRequired: "yes",
      awardRules: "cash",
      officialSiteUrl: "https://example.com/auto",
    },
  });

  await prisma.case.upsert({
    where: { slug: "data-breach-privacy" },
    update: {},
    create: {
      slug: "data-breach-privacy",
      title: "Data Breach Privacy Settlement",
      defendants: "Tech Solutions Ltd",
      jurisdiction: "California",
      status: "open",
      categoryId: privacy.id,
      claimDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      proofRequired: "no",
      awardRules: "credit monitoring",
      officialSiteUrl: "https://example.com/privacy",
    },
  });

  await prisma.case.upsert({
    where: { slug: "product-safety-refund" },
    update: {},
    create: {
      slug: "product-safety-refund",
      title: "Consumer Product Safety Refund",
      defendants: "Home Goods Inc",
      jurisdiction: "National",
      status: "closed",
      categoryId: consumer.id,
      claimDeadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      proofRequired: "yes",
      awardRules: "replacement",
      officialSiteUrl: "https://example.com/safety",
    },
  });

  await prisma.case.upsert({
    where: { slug: "overtime-wage" },
    update: {},
    create: {
      slug: "overtime-wage",
      title: "Overtime Wage Class Action",
      defendants: "Logistics United",
      jurisdiction: "Texas",
      status: "open",
      categoryId: employment.id,
      claimDeadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      proofRequired: "yes",
      awardRules: "cash",
      officialSiteUrl: "https://example.com/wages",
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
