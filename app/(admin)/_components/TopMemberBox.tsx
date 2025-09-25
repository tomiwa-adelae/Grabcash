"use client";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { formatDate } from "@/lib/utils";
import { IconCalendar, IconMail, IconMapPin } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UserStatus } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";

interface Props {
  image: string | null;
  name: string;
  email: string;
  country: string | null;
  index: number;
  status: UserStatus;
  isAdmin: boolean;
  createdAt: Date;
  username: string;
  id: string;
  jobs: number;
  applicants: number;
}

export const TopMemberBox = ({
  image,
  name,
  email,
  country,
  index,
  status,
  isAdmin,
  createdAt,
  username,
  id,
  jobs = 0,
  applicants = 0,
}: Props) => {
  const router = useRouter();
  const profilePicture = useConstructUrl(image);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group hover:bg-accent/50 flex flex-col cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors sm:flex-row sm:items-center"
      onClick={() => router.push(`/admin/${username}`)}
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
          <div
            className={`border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 ${
              status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>

        <div className="flex-1 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="truncate text-sm font-medium">{name}</h4>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  isAdmin
                    ? "bg-purple-500/10 text-purple-500"
                    : "bg-gray-500/10 text-gray-500"
                }`}
              >
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-1">
                <IconMail className="h-3 w-3" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconMapPin className="h-3 w-3" />
                <span>{country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
