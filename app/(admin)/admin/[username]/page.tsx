import { ShareButton } from "@/components/ShareButton";
import { formatDate, formattedStatus } from "@/lib/utils";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";
import { env } from "@/lib/env";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isFollowing } from "@/app/data/follow/is-following";
import { followers } from "@/app/data/follow/followers";
import { followings } from "@/app/data/follow/followings";
import { DEFAULT_LIMIT } from "@/constants";
import { ProfilePicture } from "@/app/(member)/(profile)/_components/ProfilePicture";
import { FollowingDetails } from "@/app/(member)/(profile)/_components/FollowingDetails";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/app/data/admin/user/get-user-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickActions } from "./_components/QuickActions";
import { Earnings } from "./_components/Earnings";
import { ProfileTabs } from "./_components/ProfileTabs";
import { Transactions } from "./_components/Transactions";

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

  const user = await getUserProfile(username);

  const jobs = await getAvailableJobs();

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

  return (
    <div className="space-y-6">
      <ProfilePicture myProfile={true} image={user.image} name={user.name} />
      <div className="flex flex-col items-center justify-center text-center space-y-4 w-full">
        <div>
          <h1 className="font-medium text-2xl md:text-3xl">
            {user.name}{" "}
            <Badge
              variant={user.status === "ACTIVE" ? "default" : "destructive"}
            >
              {formattedStatus[user.status]}
            </Badge>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            @{user.username}
          </p>
        </div>
        <ShareButton
          profileName={user.name}
          profileUrl={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/${user.username}`}
          text="Share profile"
        />
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
          <p>
            <span className="text-black dark:text-primary">Last login:</span>{" "}
            {formatDate(user.sessions[0].createdAt)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Earnings earnings={user.earnings} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
      <ProfileTabs jobsPosted={user.jobs} applications={user.applicants} />
      <Transactions />
    </div>
  );
};

export default page;
