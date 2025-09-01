import { JobProvider } from "@/context/JobContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <JobProvider>
      <div className="py-12 container">{children}</div>
    </JobProvider>
  );
};

export default layout;
