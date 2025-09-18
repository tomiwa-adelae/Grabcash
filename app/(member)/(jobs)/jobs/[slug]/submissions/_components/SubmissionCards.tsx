import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const SubmissionCards = ({
  total,
  approved,
  rejected,
  pending,
}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="gap-0 bg-[#38485C] text-white">
        <CardContent className="flex flex-col items-center text-center justify-center gap-0.5">
          <h2 className="font-medium text-2xl md:text-3xl">{total}</h2>
          <p className="text-sm md:text-base">Total Submissions</p>
        </CardContent>
      </Card>
      <Card className="gap-0 bg-[#F2FDF6] border border-primary text-primary">
        <CardContent className="flex flex-col items-center text-center justify-center gap-0.5">
          <h2 className="font-medium text-2xl md:text-3xl">{approved}</h2>
          <p className="text-sm md:text-base">Approved</p>
        </CardContent>
      </Card>
      <Card className="gap-0 bg-[#FDF7ED] border border-[#D8833B] text-[#D8833B]">
        <CardContent className="flex flex-col items-center text-center justify-center gap-0.5">
          <h2 className="font-medium text-2xl md:text-3xl">{pending}</h2>
          <p className="text-sm md:text-base">Pending Review</p>
        </CardContent>
      </Card>
      <Card className="gap-0 bg-[#FAEDEA] border border-[#D3483E] text-[#D3483E]">
        <CardContent className="flex flex-col items-center text-center justify-center gap-0.5">
          <h2 className="font-medium text-2xl md:text-3xl">{rejected}</h2>
          <p className="text-sm md:text-base">Rejected</p>
        </CardContent>
      </Card>
    </div>
  );
};
