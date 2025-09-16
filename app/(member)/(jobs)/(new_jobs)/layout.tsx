import { JobProvider } from "@/context/JobContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <JobProvider>
      <div className="container py-16 md:py-32">{children}</div>
    </JobProvider>
  );
};

export default layout;
