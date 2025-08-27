import React from "react";

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        {title}
      </h1>
    </div>
  );
};
