import { LatestBlog } from "./LatestBlog";
import { RecentBlog } from "./RecentBlog";

export const LatestBlogs = () => {
  return (
    <div className="container py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-4">
      <LatestBlog />
      <div>
        <h3 className="font-medium text-lg">Recent Articles</h3>
        <div className="grid gap-4 mt-4">
          <RecentBlog />
          <RecentBlog />
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};
