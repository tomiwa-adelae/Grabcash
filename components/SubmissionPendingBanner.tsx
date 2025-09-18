import { IconClock } from "@tabler/icons-react";

export function SubmissionPendingBanner() {
  return (
    <div className="dark bg-yellow-500/5 rounded-lg p-5 text-yellow-500">
      <div className="flex grow gap-3 md:items-center">
        <IconClock className="size-7" />
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">Submission is under review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
