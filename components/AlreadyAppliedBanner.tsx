import { Lightbulb } from "lucide-react";

import Link from "next/link";

interface Props {
  id: string;
}

export function AlreadyAppliedBanner({ id }: Props) {
  return (
    <div className="dark bg-primary/5 rounded-lg p-5 text-primary">
      <div className="flex grow gap-3 md:items-center">
        <Lightbulb className="size-7" />
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">
              You have already submitted an application.
            </p>
            <Link
              href={`/submitted-jobs/${id}`}
              className="text-sm underline hover:text-primary"
            >
              View Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
