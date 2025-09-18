// import React from "react";
// import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
// import { PageHeader } from "../../_components/PageHeader";
// import { SearchBar } from "../../_components/SearchBar";
// import { PaginationComponent } from "@/components/Pagination";
// import { JobsTable } from "./_components/JobsTable";
// import { JobsCard } from "./_components/JobsCard";
// import { getMySubmittedJobs } from "@/app/data/user/job/submitted/get-my-submitted-jobs";

// const page = async () => {
//   const jobs = await getMySubmittedJobs();
//   return (
//     <div className="py-16 md:py-32 container space-y-6">
//       <PageHeader title="Submitted Jobs" />
//       <SearchBar />
//       <JobsTable jobs={jobs} />
//       <JobsCard jobs={jobs} />
//       <PaginationComponent totalPages={10} />
//     </div>
//   );
// };

// export default page;
import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { SearchBar } from "../../_components/SearchBar";
import { JobsTable } from "./_components/JobsTable";
import { JobsCard } from "./_components/JobsCard";
import { getMySubmittedJobs } from "@/app/data/user/job/submitted/get-my-submitted-jobs";
import { EmptyState } from "@/components/EmptyState";
import { DEFAULT_LIMIT } from "@/constants";

type SearchParams = Promise<{
  query?: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { query } = await searchParams;

  // Get initial data with pagination
  const jobsData = await getMySubmittedJobs({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Adjust this as needed
  });

  return (
    <div className="py-16 md:py-32 container space-y-6">
      <PageHeader title="Submitted Jobs" />
      <SearchBar />
      {jobsData.jobs.length !== 0 && (
        <>
          <JobsTable
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
          <JobsCard
            initialJobs={jobsData.jobs}
            initialHasNext={jobsData.pagination.hasNext}
            initialTotal={jobsData.pagination.total}
            query={query}
          />
        </>
      )}
      {jobsData.jobs.length === 0 && (
        <EmptyState
          title="No submitted jobs found"
          description="Once you've submitted a job, they would appear here"
        />
      )}
    </div>
  );
};

export default page;
