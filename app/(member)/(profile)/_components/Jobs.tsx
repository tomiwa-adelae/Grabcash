import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";
import { PaginationComponent } from "@/components/Pagination";

interface Props {
  jobs: GetAvailableJobsType[];
}

export const Jobs = ({ jobs }: Props) => {
  return (
    <div className="bg-muted py-8 rounded-lg">
      <div className="container">
        {/* <JobsTable jobs={jobs} />
        <JobsCard jobs={jobs} />
        <PaginationComponent totalPages={10} /> */}
      </div>
    </div>
  );
};
