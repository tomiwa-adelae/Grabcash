import { JobProvider } from "@/context/JobContext";
import React, { ReactNode } from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Post new job - Grabcash",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <JobProvider>
      <div className="container py-16 md:py-24">{children}</div>
    </JobProvider>
  );
};

export default layout;
