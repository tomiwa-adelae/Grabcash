"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { followUser } from "@/app/actions";
import { Loader } from "./Loader";

import { useState } from "react";
import { UnfollowModal } from "./UnfollowModal";

interface Props {
  id: string;
  following: boolean;
  image: string | null;
  username: string | null;
  name: string;
}

export const FollowButton = ({
  id,
  following,
  image,
  username,
  name,
}: Props) => {
  const [pending, startTransition] = useTransition();
  const [openModal, setOpenModal] = useState(false);

  const handleFollow = () => {
    startTransition(async () => {
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

  if (!following)
    return (
      <Button
        size="md"
        className="rounded-full"
        onClick={handleFollow}
        disabled={pending}
      >
        {pending ? <Loader text="Following..." /> : "Follow"}
      </Button>
    );

  return (
    <>
      <Button
        size="md"
        variant={"outline"}
        className="rounded-full"
        onClick={() => setOpenModal(true)}
        disabled={pending}
      >
        {pending ? <Loader text="Unfollowing..." /> : "Following"}
      </Button>
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
    </>
  );
};
