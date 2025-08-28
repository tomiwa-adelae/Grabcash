import { JobProvider } from "@/context/JobContext";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <JobProvider>{children}</JobProvider>;
};

export default layout;
