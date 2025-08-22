import React from "react";
import { Showcase } from "../_components/Showcase";
import { LatestBlogs } from "./_components/LatestBlogs";
import { PopularBlogs } from "./_components/PopularBlogs";

const page = () => {
  return (
    <div>
      <Showcase
        title="Blog"
        description="Insights, Tips, and Stories to Boost Your Earnings. Stay ahead with practical advice, platform updates, and success stories from Earnsphere members and experts."
        image={"/assets/images/blog-img.jpg"}
      />
      <LatestBlogs />
      <PopularBlogs />
    </div>
  );
};

export default page;
