import { IconFolderCheck } from "@tabler/icons-react";

export function SubmissionApprovedBanner() {
  return (
    <div className="dark bg-primary/5 rounded-lg p-5 text-primary">
      <div className="flex grow gap-3 md:items-center">
        <IconFolderCheck className="size-7" />
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">Submission has been approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
