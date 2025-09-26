import { getTotalUsers } from "@/app/data/admin/user/get-total-users";
import { UserBox } from "./UserBox";
import { DEFAULT_LIMIT } from "@/constants";

export const RecentUsers = async () => {
  const users = await getTotalUsers({ limit: DEFAULT_LIMIT });
  return (
    <div className="border-border bg-card/40 rounded-xl border p-3 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold md:text-xl">Recent Users</h3>
          <p className="text-muted-foreground text-sm">
            Latest user registrations and activity
          </p>
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
