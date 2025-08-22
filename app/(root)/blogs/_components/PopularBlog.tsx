import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const PopularBlog = () => {
  return (
    <div>
      <Image
        src="/assets/images/blog-one-img.jpg"
        alt="Blog image"
        width={1000}
        height={1000}
        className="aspect-video rounded-lg object-cover"
      />
      <p className="text-sm text-primary mt-4">Finance</p>
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
  );
};
