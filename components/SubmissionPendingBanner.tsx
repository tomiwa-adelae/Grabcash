import { IconClock } from "@tabler/icons-react";

export function SubmissionPendingBanner() {
  return (
    <div className="dark bg-yellow-500/5 rounded-lg p-5 text-yellow-500">
      <div className="flex items-center justify-start gap-3 md:items-center">
        <IconClock className="size-7" />
        <p className="text-sm font-medium">Submission is under review</p>
      </div>
    </div>
  );
}
