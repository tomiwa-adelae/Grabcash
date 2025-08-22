import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const RecentBlog = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <div className="col-span-2">
        <Image
          src="/assets/images/blog-related.jpg"
          alt="Blog image"
          width={1000}
          height={1000}
          className="aspect-video size-full rounded-lg object-cover"
        />
      </div>
      <div className="col-span-3">
        <p className="text-primary text-sm">Skills</p>
        <Link
          href="/blogs/1"
          className="text-lg font-medium hover:underline hover:text-primary transition-all"
        >
          Top 7 Skills That Can Help You Succeed in Micro-Jobs and Bounty
          Campaigns
        </Link>
        <div className="text-sm mt-2 mb-2">
          <span>August 2, 2025</span> <Dot className="inline-block" />{" "}
          <span className="text-muted-foreground">3 minutes read</span>
        </div>
      </div>
    </div>
  );
};
