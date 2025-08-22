import React from "react";
import { PopularBlog } from "./PopularBlog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PopularBlogs = () => {
  return (
    <div className="container pb-12">
      <h2 className="text-2xl font-medium">Popular articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
        <PopularBlog />
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Button asChild size={"md"}>
          <Link href="/blogs">Load more articles</Link>
        </Button>
      </div>
    </div>
  );
};
