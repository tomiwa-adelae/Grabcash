import { IconMoodX } from "@tabler/icons-react";

export function JobClosedBanner() {
  return (
    <div className="dark bg-destructive/10 rounded-lg p-5 text-destructive">
      <div className="flex grow gap-3 md:items-center">
        <IconMoodX className="size-7" />
        <p className="text-sm font-medium">This job is already closed</p>
      </div>
    </div>
  );
}
