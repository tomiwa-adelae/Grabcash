import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import React from "react";
import { UsersList } from "../../_components/UsersList";
import { getTotalUsers } from "@/app/data/admin/user/get-total-users";
import { DEFAULT_LIMIT } from "@/constants";
import { EmptyState } from "@/components/EmptyState";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All users - Grabcash",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const usersData = await getTotalUsers({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <PageHeader title="All users" />
        <p className="text-muted-foreground text-sm md:text-base">
          Manage the users on grabcash
        </p>
      </div>
      <SearchBar />
      {usersData.users.length !== 0 && (
        <UsersList
          initialUsers={usersData.users}
          initialHasNext={usersData.pagination.hasNext}
          initialTotal={usersData.pagination.total}
          query={query}
        />
      )}
      {usersData.users.length === 0 && (
        <EmptyState
          title="No users found"
          description="Once users have been created an account, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
