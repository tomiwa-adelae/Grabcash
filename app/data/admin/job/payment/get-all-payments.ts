import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../../require-admin";

export const getAllPayments = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {};

  // Add search if provided
  if (query) {
    whereConditions.OR = [
      { txRef: { contains: query, mode: "insensitive" } },
      { transactionId: { contains: query, mode: "insensitive" } },
      { amount: { contains: query, mode: "insensitive" } },

      // Search inside User relation
      {
        User: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },

      // Search inside Job relation
      {
        Job: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { type: { contains: query, mode: "insensitive" } },
            { jobID: { contains: query, mode: "insensitive" } },
            { reward: { contains: query, mode: "insensitive" } },
            { noOfWorkers: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } }, // typo fix ✅
          ],
        },
      },
    ];
  }

  // Get payments and total count
  const [payments, totalCount] = await Promise.all([
    prisma.jobPayment.findMany({
      where: whereConditions,
      select: {
        id: true,
        txRef: true,
        status: true,
        transactionId: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
        Job: {
          select: {
            title: true,
            slug: true,
            reward: true,
            noOfWorkers: true,
            paymentVerified: true,
          },
        },
        User: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.jobPayment.count({
      where: whereConditions,
    }),
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages;

  return {
    payments,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      hasNext,
      hasPrev: page > 1,
    },
  };
};

export type GetAllPaymentsResponse = Awaited<ReturnType<typeof getAllPayments>>;
export type GetAllPaymentsType = GetAllPaymentsResponse["payments"][0];
