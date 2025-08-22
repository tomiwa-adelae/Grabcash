import React from "react";
import { PopularBlogs } from "../_components/PopularBlogs";
import { PopularBlog } from "../_components/PopularBlog";

const page = () => {
  return (
    <div className="py-12">
      <div className="container">
        <h1 className="font-semibold text-4xl md:text-4xl lg:text-6xl">
          Earnsphere Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
          <PopularBlog />
        </div>
      </div>
    </div>
  );
};

export default page;
