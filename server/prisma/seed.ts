import { addMonths, startOfDay, endOfDay } from "date-fns";
import { prisma } from "../lib/prisma.js";

const SEASONS = [
  { name: "Alpha", multiplier: 3 },
  { name: "Beta", multiplier: 2 },
  { name: "Growth", multiplier: 1 },
];

async function main() {
  const existing = await prisma.season.findFirst({
    where: { isActive: true },
  });

  if (existing) {
    console.log("✅ Active season already exists:", existing.name);
    return;
  }

  const alpha = SEASONS[0];
  const now = new Date();

  const startAt = startOfDay(now);
  const endAt = endOfDay(addMonths(startAt, 3));

  const season = await prisma.season.create({
    data: {
      name: alpha.name,
      multiplier: alpha.multiplier,
      startAt,
      endAt,
      isActive: true,
    },
  });

  console.log("🚀 Initialized first season:", season.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
