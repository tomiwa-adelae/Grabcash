import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LatestBlog = () => {
  return (
    <div>
      <Image
        src={"/assets/images/blog-one-img.jpg"}
        alt="Blog image"
        width={1000}
        height={1000}
        className="aspect-video object-cover rounded-lg"
      />
      <p className="text-primary text-sm font-medium mt-6">
        Earning & Oppourtunities
      </p>
      <Link
        href="/blogs/12345"
        className="hover:underline hover:text-primary transition-all font-semibold text-2xl"
      >
        5 Simple Ways to Boost Your Earnings on Earnsphere in Just 7 Days
      </Link>
      <div className="text-sm mt-2 mb-2">
        <span>August 2, 2025</span> <Dot className="inline-block" />{" "}
        <span className="text-muted-foreground">3 minutes read</span>
      </div>
      <p className="text-muted-foreground text-base">
        Whether you’re new to Earnsphere or have been posting jobs and bounties
        for a while, the truth is—small tweaks can lead to big gains. In this
        post, we’ll share five practical, beginner-friendly strategies to help
        you get more done, earn more, and attract better opportunities within a
        single week....
      </p>
    </div>
  );
};
