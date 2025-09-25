import "server-only";
import { prisma } from "@/lib/db";
import { DEFAULT_LIMIT } from "@/constants";
import { requireAdmin } from "../../require-admin";

export const getAllWithdrawals = async ({
  query,
  page = 1,
  limit = DEFAULT_LIMIT,
}: Params = {}) => {
  await requireAdmin();

  const skip = (page - 1) * limit;

  // Base query conditions
  const whereConditions: any = {
    withdrawal: true,
  };

  // Add search if provided
  if (query) {
    const numericQuery = Number(query);
    const isValidNumber = !isNaN(numericQuery) && query.trim() !== "";

    // String-based searches
    const stringConditions = [
      { title: { contains: query, mode: "insensitive" } },
      { bankName: { contains: query, mode: "insensitive" } },
      { accountName: { contains: query, mode: "insensitive" } },
      { accountNumber: { contains: query, mode: "insensitive" } },
      {
        User: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
          ],
        },
      },
    ];

    // If the query is a valid number, add numeric field searches
    if (isValidNumber) {
      whereConditions.OR = [
        ...stringConditions,
        { amount: { equals: numericQuery } },
        { fee: { equals: numericQuery } },
      ];
    } else {
      // If not a number, only search string fields
      whereConditions.OR = stringConditions;
    }
  }

  // Get jobs and total count
  const [withdrawals, totalCount] = await Promise.all([
    prisma.payout.findMany({
      where: whereConditions,
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        type: true,
        title: true,
        User: {
          select: {
            name: true,
            accountName: true,
            bankName: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.payout.count({
      where: whereConditions,
    }),
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages;

  return {
    withdrawals,
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

export type GetAllWithdrawalsResponse = Awaited<
  ReturnType<typeof getAllWithdrawals>
>;
export type GetAllWithdrawalsType = GetAllWithdrawalsResponse["withdrawals"][0];
