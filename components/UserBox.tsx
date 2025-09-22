"use client";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { isFollowing } from "@/app/data/follow/is-following";
import { tryCatch } from "@/hooks/use-try-catch";
import { followUser } from "@/app/actions";
import { toast } from "sonner";
import { UnfollowModal } from "./UnfollowModal";
import { Loader } from "./Loader";

interface Props {
  image: string | null;
  name: string;
  username: string | null;
  id: string;
  isFollowing: boolean;
  isSelf: boolean;
}

export const UserBox = ({
  image,
  name,
  username,
  id,
  isSelf,
  isFollowing,
}: Props) => {
  const [followPending, startFollowTransition] = useTransition();
  const [openModal, setOpenModal] = useState(false);

  const handleFollow = () => {
    startFollowTransition(async () => {
      const { data: result, error } = await tryCatch(followUser(id));

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

  const profilePicture = useConstructUrl(image);

  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${username}`)}
      className="border-b last:border-0 p-3 hover:bg-accent transition-all cursor-pointer flex items-center justify-between"
    >
      <div className="flex-1 flex items-center justify-start gap-2">
        <Image
          src={profilePicture}
          alt={`${name}'s profile`}
          width={1000}
          height={1000}
          className="rounded-full size-14 object-cover"
        />
        <div>
          <p className="text-base font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      {/* {!isSelf && isFollowing ? (
        <Button
          size="sm"
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          Following
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFollow();
          }}
          disabled={followPending}
        >
          Follow
        </Button>
      )}
       */}
      {!isSelf && (
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "default"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFollowing) {
              setOpenModal(true); // Or handle unfollow directly
            } else {
              handleFollow();
            }
          }}
          disabled={followPending}
        >
          {followPending ? (
            <Loader text={"Following..."} />
          ) : isFollowing ? (
            "Following"
          ) : (
            "Follow"
          )}
        </Button>
      )}

      {openModal && (
        <UnfollowModal
          open={openModal}
          closeModal={() => {
            setOpenModal(false);
          }}
          image={image}
          username={username}
          id={id}
          name={name}
        />
      )}
    </div>
  );
};
