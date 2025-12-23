"use client";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { JobApplicationStatus, JobPaymentStatus } from "@/lib/generated/prisma";
import { cn, formatDate, formatMoneyInput, formattedStatus } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { JobActions } from "./JobActions";
import { NairaIcon } from "@/components/NairaIcon";
import { Badge } from "@/components/ui/badge";
import { SubmissionActions } from "../admin/jobs/[slug]/submissions/_components/SubmissionActions";
import { GetJobApplicantsType } from "@/app/data/admin/job/submission/get-job-applicants";
import { RejectSubmissionModal } from "../admin/jobs/[slug]/submissions/_components/RejectSubmissionModal";

interface Props {
  index: number;
  slug: string;
  name: string;
  image: string;
  title: string;
  username: string;
  createdAt: Date;
  status: JobApplicationStatus;
  reward: string;
  id: string;
}

export const SubmissionBox = ({
  index,
  image,
  name,
  title,
  slug,
  username,
  createdAt,
  status,
  id,
  reward,
}: Props) => {
  const router = useRouter();
  const profilePicture = useConstructUrl(image);

  // Modal state at table level
  const [openRejectModal, setOpenRejectModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex flex-col cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
      onClick={() => router.push(`/admin/jobs/${slug}/submissions/${id}`)}
    >
      <div className="flex w-full items-center gap-4 md:w-auto">
        <div className="relative">
          <Image
            src={profilePicture}
            alt={`${name}'s profile`}
            width={1000}
            height={1000}
            className="rounded-full size-14 object-cover"
          />
        </div>

        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/jobs/${slug}`}
                className="line-clamp-1 text-sm font-medium hover:underline hover:text-primary"
              >
                {title} - <NairaIcon />
                {formatMoneyInput(reward)}
              </Link>
              <Badge
                variant={
                  status === "REJECTED"
                    ? "destructive"
                    : status === "APPROVED"
                    ? "success"
                    : "pending"
                }
              >
                {formattedStatus[status]}
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-1 line-clamp-1 hover:underline hover:text-primary">
                <Link href={`/admin/${username}`}>@{username}</Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <SubmissionActions
              id={id}
              slug={slug}
              status={status}
              onReject={() => {
                setOpenRejectModal(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="ml-auto hidden md:flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <IconCalendar className="h-3 w-3" />
          <span>{formatDate(createdAt)}</span>
        </div>
        <div>
          <SubmissionActions
            id={id}
            slug={slug}
            status={status}
            onReject={() => {
              setOpenRejectModal(true);
            }}
          />
        </div>
      </div>
      {/* Modal rendered outside the table */}
      {openRejectModal && (
        <RejectSubmissionModal
          open={openRejectModal}
          closeModal={() => setOpenRejectModal(false)}
          applicantName={name}
          jobTitle={title}
          slug={slug}
          applicantId={id}
        />
      )}
    </motion.div>
  );
};
