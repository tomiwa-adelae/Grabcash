import { IconBan } from "@tabler/icons-react";

export function SubmissionRejectedBanner() {
  return (
    <div className="dark bg-destructive/5 rounded-lg p-5 text-destructive">
      <div className="flex grow gap-3 md:items-center">
        <IconBan className="size-7" />
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">Submission has been rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
