import { Button } from "@/components/ui/button";
import { TrendingUp, Plus } from "lucide-react";
import { getTotalUsers } from "@/app/data/admin/user/get-total-users";
import { UserBox } from "./UserBox";

export const RecentUsers = async () => {
  const users = await getTotalUsers({ limit: 3 });
  return (
    <div className="border-border bg-card/40 rounded-xl border p-3 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold md:text-xl">Recent Users</h3>
          <p className="text-muted-foreground text-sm">
            Latest user registrations and activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-green-500">
            <TrendingUp className="h-4 w-4" />
            <span>+12%</span>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {users.users.map((user, index) => (
          <UserBox
            index={index}
            country={user.country}
            createdAt={user.createdAt}
            email={user.email}
            name={user.name}
            image={user.image}
            isAdmin={user.isAdmin}
            status={user.status}
            key={user.id}
            username={user.username!}
            id={user.id}
            applicants={user._count.applicants}
            jobs={user._count.jobs}
          />
        ))}
      </div>
    </div>
  );
};
