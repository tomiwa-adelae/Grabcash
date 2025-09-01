import { subscriptionPlans } from "@/constants";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

async function main() {
  for (const plan of subscriptionPlans) {
    await prisma.subscriptionPlan.upsert({
      where: {
        name: plan.name,
        billingCycle: "MONTHLY",
        id: uuidv4(),
      },
      update: {},
      create: {
        name: plan.name,
        billingCycle: "MONTHLY",
        price: plan.price.monthly,
        durationDays: "30",
        description: plan.description,
        features: plan.features,
        badge: plan.badge,
      },
    });
  }

  for (const plan of subscriptionPlans) {
    await prisma.subscriptionPlan.upsert({
      where: {
        name: plan.name,
        billingCycle: "ANNUALLY",
        id: uuidv4(),
      },
      update: {},
      create: {
        name: plan.name,
        billingCycle: "ANNUALLY",
        price: plan.price.annually,
        durationDays: "365",
        description: plan.description,
        features: plan.features,
        badge: plan.badge,
      },
    });
  }

  console.log("✅ Seeded subscription plans (monthly & annually)");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
