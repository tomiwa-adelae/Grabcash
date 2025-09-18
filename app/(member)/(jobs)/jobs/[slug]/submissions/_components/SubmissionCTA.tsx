"use client";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/use-try-catch";
import { JobApplicationStatus } from "@/lib/generated/prisma";
import { IconBan, IconCheck } from "@tabler/icons-react";
import React, { useState, useTransition } from "react";
import { approveApplication } from "../actions";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { RejectSubmissionModal } from "./RejectSubmissionModal";

interface Props {
  status: JobApplicationStatus;
  id: string;
  slug: string;
  applicantName: string;
  JobTitle: string;
}

export const SubmissionCTA = ({
  status,
  id,
  slug,
  applicantName,
  JobTitle,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const handleApproveSubmission = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        approveApplication(id, slug)
      );

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      {status === "PENDING" && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            onClick={handleApproveSubmission}
            size="md"
            variant={"outline"}
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
            disabled={pending}
          >
            {pending ? (
              <Loader text="Approving..." />
            ) : (
              <>
                <IconCheck />
                Approve Job
              </>
            )}
          </Button>
          <Button
            size="md"
            variant={"outline"}
            className="border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive w-full sm:w-auto"
            onClick={() => setOpenRejectModal(true)}
          >
            <IconBan />
            Reject Job
          </Button>
        </div>
      )}
      {openRejectModal && (
        <RejectSubmissionModal
          open={openRejectModal}
          closeModal={() => setOpenRejectModal(false)}
          applicantName={applicantName}
          jobTitle={JobTitle}
          slug={slug}
          applicantId={id}
        />
      )}
    </>
  );
};
