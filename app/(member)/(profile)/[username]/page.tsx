import { ShareButton } from "@/components/ShareButton";
import { formatDate } from "@/lib/utils";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { env } from "@/lib/env";
import { ProfilePicture } from "../_components/ProfilePicture";
import { ProfileTabs } from "../_components/ProfileTabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconMessage } from "@tabler/icons-react";
import { FollowButton } from "@/components/FollowButton";
import { isFollowing } from "@/app/data/follow/is-following";
import { getUserProfile } from "@/app/data/user/get-user-profile";
import { FollowingDetails } from "../_components/FollowingDetails";
import { followers } from "@/app/data/follow/followers";
import { followings } from "@/app/data/follow/followings";
import { DEFAULT_LIMIT } from "@/constants";
import { getMyJobs } from "@/app/data/user/job/my-job/get-my-jobs";
import { Metadata, ResolvingMetadata } from "next";
import { ReferralCard } from "../_components/ReferralCard";

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  try {
    const user = await getUserProfile(username);
    return {
      title: `${user.name} - Grabcash`,
    };
  } catch (error) {
    return {
      title: "Grabcash",
    };
  }
}

type Params = Promise<{
  username: string;
}>;

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) => {
  const { username } = await params;
  const { query } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUserProfile(username);

  // Updated to get pagination data
  const userFollowersData = await followers({
    id: user.id,
    query,
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  // Updated to get pagination data
  const userFollowingsData = await followings({
    id: user.id,
    query,
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const following = await isFollowing(user.id);

  const myProfile = username === session?.user.username;

  return (
    <div className="py-16 md:py-24 container">
      <div className="flex flex-col items-center justify-center w-full">
        <ProfilePicture
          myProfile={myProfile}
          image={user.image}
          name={user.name}
        />
        <div className="mt-8 flex flex-col items-center justify-center text-center space-y-4 w-full">
          <div>
            <h1 className="font-medium text-2xl md:text-3xl">{user.name}</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              @{user.username}
            </p>
          </div>
          {myProfile && user.referralCode && (
            <ReferralCard referralCode={user.referralCode} />
          )}
          {myProfile && (
            <ShareButton
              profileName={user.name}
              profileUrl={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/${user.username}`}
              text="Share profile"
            />
          )}
          {!myProfile && (
            <div className="flex items-center justify-center gap-2">
              <ShareButton
                profileName={user.name}
                profileUrl={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/${user.username}`}
                className="rounded-lg bg-secondary text-black dark:text-primary"
              />
              <FollowButton
                image={user.image}
                following={following}
                id={user.id}
                username={user.username}
                name={user.name}
              />
              <Button asChild size="md" variant={"secondary"}>
                <Link href={`mailto:${user.email}`}>
                  <IconMessage />
                </Link>
              </Button>
            </div>
          )}
          <div className="mt-6 text-sm md:text-base text-muted-foreground space-y-2.5">
            <FollowingDetails
              followers={user._count.followers}
              following={user._count.following}
              userFollowers={userFollowersData.followers}
              userFollowings={userFollowingsData.followings}
              userId={user.id}
              hasNext={
                userFollowersData.pagination.hasNext ||
                userFollowingsData.pagination.hasNext
              }
              query={query}
            />
            <p>
              <span className="text-black dark:text-primary">Joined:</span>{" "}
              {formatDate(user.createdAt)}
            </p>
            {user.country && (
              <p>
                <span className="text-black dark:text-primary">Country:</span>{" "}
                {user.country}
              </p>
            )}
            {user.bio && (
              <p>
                <RenderDescription json={user.bio} />
              </p>
            )}
          </div>
        </div>
        <ProfileTabs myProfile={myProfile} user={user} query={query} />
      </div>
    </div>
  );
};

export default page;
