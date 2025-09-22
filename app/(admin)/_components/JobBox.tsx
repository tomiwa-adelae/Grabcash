"use client";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { JobPaymentStatus } from "@/lib/generated/prisma";
import { cn, formatDate, formatMoneyInput } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { JobActions } from "./JobActions";
import { NairaIcon } from "@/components/NairaIcon";

interface Props {
  index: number;
  slug: string;
  name: string;
  image: string;
  title: string;
  jobOpen: boolean;
  username: string;
  applicants: number;
  noOfWorkers: string;
  createdAt: Date;
  id: string;
  reward: string;
}

export const JobBox = ({
  index,
  image,
  name,
  title,
  slug,
  jobOpen,
  username,
  applicants,
  noOfWorkers,
  createdAt,
  id,
  reward,
}: Props) => {
  const router = useRouter();
  const profilePicture = useConstructUrl(image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex flex-col cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
      onClick={() => router.push(`/admin/jobs/${slug}`)}
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
                className="truncate text-sm font-medium hover:underline hover:text-primary"
              >
                {title} - <NairaIcon />
                {formatMoneyInput(reward)}
              </Link>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  jobOpen
                    ? "bg-purple-500/10 text-purple-500"
                    : "bg-gray-500/10 text-gray-500"
                }`}
              >
                {jobOpen ? "Active" : "Closed"}
              </span>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-1 truncate hover:underline hover:text-primary">
                <Link href={`/admin/${username}`}>@{username}</Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <JobActions name={name} id={id} jobOpen={jobOpen} slug={slug} />
          </div>
        </div>
      </div>

      <div className="ml-auto hidden md:flex items-center justify-between md:justify-end w-full md:w-auto gap-3">
        <div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <IconCalendar className="h-3 w-3" />
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="flex flex-col text-sm items-start justify-center gap-1">
            {applicants}/{noOfWorkers}
            <Progress
              value={(applicants / Number(noOfWorkers)) * 100}
              className={cn("h-1")}
            />
          </div>
        </div>
        <div className="">
          <JobActions name={name} id={id} jobOpen={jobOpen} slug={slug} />
        </div>
      </div>
      {/* Modal rendered outside the table */}
      {/* {openDeleteModal && (
        <DeleteJobModal
          open={openDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
          username={username}
          name={name}
          image={image}
          id={id}
        />
      )} */}
    </motion.div>
  );
};
