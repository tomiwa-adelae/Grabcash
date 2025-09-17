import { IconUserSquareRounded } from "@tabler/icons-react";

export function IsOwnerJobBanner() {
  return (
    <div className="dark bg-primary/10 rounded-lg p-5 text-primary">
      <div className="flex grow gap-3 md:items-center">
        <IconUserSquareRounded className="size-7" />
        <p className="text-sm font-medium">This is your job</p>
      </div>
    </div>
  );
}
