"use client";

import { FollowersType } from "@/app/data/follow/followers";
import { FollowingsType } from "@/app/data/follow/followings";
import { FollowersModal } from "@/components/FollowersModal";
import { FollowingsModal } from "@/components/FollowingsModal";
import React, { useState } from "react";

interface Props {
  followers: number;
  following: number;
  userFollowers: FollowersType[];
  userFollowings: FollowingsType[];
  userId: string;
  hasNext: boolean;
  query?: string;
}

export const FollowingDetails = ({
  followers,
  following,
  userFollowers,
  userFollowings,
  userId,
  hasNext,
  query,
}: Props) => {
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowings, setOpenFollowings] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-6">
        <p
          onClick={() => setOpenFollowers(true)}
          className="cursor-pointer hover:text-primary"
        >
          <span className="text-black">Followers:</span> {followers}
        </p>
        <p
          onClick={() => setOpenFollowings(true)}
          className="cursor-pointer hover:text-primary"
        >
          <span className="text-black">Following:</span> {following}
        </p>
      </div>
      {openFollowers && (
        <FollowersModal
          open={openFollowers}
          closeModal={() => setOpenFollowers(false)}
          followers={userFollowers}
          userId={userId}
          hasNext={hasNext}
          query={query}
        />
      )}
      {openFollowings && (
        <FollowingsModal
          open={openFollowings}
          closeModal={() => setOpenFollowings(false)}
          followings={userFollowings}
          userId={userId}
          hasNext={hasNext}
          query={query}
        />
      )}
    </div>
  );
};
