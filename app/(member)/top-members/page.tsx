import { PageHeader } from "@/app/(member)/_components/PageHeader";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import React from "react";
import { DEFAULT_LIMIT } from "@/constants";
import { EmptyState } from "@/components/EmptyState";
import { getTopMembers } from "@/app/data/user/get-top-members";
import { MembersList } from "./_components/MembersList";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Top Members - Grabcash",
};

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data - change limit back to 10 for production
  const membersData = await getTopMembers({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  return (
    <div className="py-16 md:py-24 container space-y-6">
      <div>
        <PageHeader title="Our Top Members members" />
      </div>
      <SearchBar />
      {membersData.members.length !== 0 && (
        <MembersList
          initialMembers={membersData.members}
          initialHasNext={membersData.pagination.hasNext}
          initialTotal={membersData.pagination.total}
          query={query}
        />
      )}
      {membersData.members.length === 0 && (
        <EmptyState
          title="No members found"
          description="Once members have been created an account, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
