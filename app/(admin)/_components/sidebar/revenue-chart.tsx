"use client";
import { getPlatformAnalytics } from "@/app/data/admin/job/payment/get-revenue-analytics";
import React, { useEffect, useState } from "react";
import { BarChartAnalytics } from "./BarChartAnalytics";
import { Button } from "@/components/ui/button";
import { AreaChartAnalytics } from "./AreaChartAnalytics";

interface Props {
  analytics: Awaited<ReturnType<typeof getPlatformAnalytics>>;
}

const STORAGE_KEY = "chart-view";

export const PlatformRevenueChart = ({ analytics }: Props) => {
  // Initialize from localStorage directly (avoids flicker)
  const [view, setView] = useState<"area" | "bar">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "area" || saved === "bar") {
        return saved;
      }
    }
    return "area"; // default
  });

  // Persist to localStorage when view changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, view);
  }, [view]);

  const toggleView = () => {
    setView((prev) => (prev === "area" ? "bar" : "area"));
  };

  return (
    <div className="border rounded-xl p-6 bg-card">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
        <Button size="md" variant="secondary" onClick={toggleView}>
          {view === "area" ? "Bar view" : "Area view"}
        </Button>
      </div>

      {view === "bar" ? (
        <BarChartAnalytics analytics={analytics} />
      ) : (
        <AreaChartAnalytics analytics={analytics} />
      )}
    </div>
  );
};
