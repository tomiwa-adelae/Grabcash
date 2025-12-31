// app/profile/_components/ReferralsList.tsx
import { getReferralStats } from "@/app/data/user/get-referrals";
import { formatDate } from "@/lib/utils";
import { IconUsers, IconGift, IconTrendingUp } from "@tabler/icons-react";

export async function ReferralsList({ userId }: { userId: string }) {
  const { referrals, totalEarnings, count } = await getReferralStats(userId);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium opacity-80">
              Total Referral Earnings
            </p>
            <IconTrendingUp size={20} />
          </div>
          <h2 className="text-3xl font-bold mt-2">
            ₦{totalEarnings.toLocaleString()}
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-secondary border shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <p className="text-sm font-medium">Friends Invited</p>
            <IconUsers size={20} />
          </div>
          <h2 className="text-3xl font-bold mt-2">{count}</h2>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconGift className="text-primary" size={20} />
          <h3 className="font-semibold text-lg">Rewards History</h3>
        </div>

        {referrals.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-2xl">
            <p className="text-muted-foreground">
              No rewards yet. Start sharing your code!
            </p>
          </div>
        ) : (
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="divide-y">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                      <IconGift size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ref.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(ref.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">+₦500</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                      Credited
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
