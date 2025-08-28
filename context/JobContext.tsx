// context/JobContext.tsx
"use client";
import { NewJobFormSchemaType } from "@/lib/zodSchemas";
import { createContext, useContext, useEffect, useState } from "react";

type JobContextType = {
  jobPreview: any;
  setJobPreview: (data: any) => void;
};

const JobContext = createContext<any>(null);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobPreview, setJobPreview] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("jobPreview");
    if (saved) {
      setJobPreview(JSON.parse(saved));
    }
  }, []);

  return (
    <JobContext.Provider value={{ jobPreview, setJobPreview }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJob = () => useContext(JobContext);
