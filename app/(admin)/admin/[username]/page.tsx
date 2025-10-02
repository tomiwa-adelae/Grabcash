import { ShareButton } from "@/components/ShareButton";
import { cn, formatDate, formattedStatus } from "@/lib/utils";
import { env } from "@/lib/env";
import { followers } from "@/app/data/follow/followers";
import { followings } from "@/app/data/follow/followings";
import { DEFAULT_LIMIT } from "@/constants";
import { ProfilePicture } from "@/app/(member)/(profile)/_components/ProfilePicture";
import { FollowingDetails } from "@/app/(member)/(profile)/_components/FollowingDetails";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/app/data/admin/user/get-user-profile";
import { QuickActions } from "./_components/QuickActions";
import { Earnings } from "./_components/Earnings";
import { ProfileTabs } from "./_components/ProfileTabs";
import { Metadata, ResolvingMetadata } from "next";
import { getUserSubscriptions } from "@/app/data/admin/subscription/get-user-subscriptions";
import { SubscriptionsList } from "../subscriptions/_components/SubscriptionsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentTransactionHistory } from "@/app/(member)/wallet/_components/RecentTransactionHistory";
import { getUserPayouts } from "@/app/data/admin/user/get-user-payouts";
import { Banner } from "@/components/Banner";
import { IconTrash } from "@tabler/icons-react";

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

  const user = await getUserProfile(username);

  const subscriptionData = await getUserSubscriptions({
    query,
    userId: user.id,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
  });

  const payoutsData = await getUserPayouts({
    query,
    page: 1,
    limit: DEFAULT_LIMIT, // Back to 10 for production, or keep at 2 for testing
    userId: user.id,
  });

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

  return (
    <div className="space-y-6">
      <Banner
        icon={IconTrash}
        text="Account already deleted"
        variant="destructive"
      />
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
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          user.status !== "DELETED" && "md:grid-cols-2"
        )}
      >
        <div>
          <Earnings
            earnings={user.earnings}
            lifeTimeEarnings={user.lifeTimeEarnings}
          />
        </div>
        {user.status !== "DELETED" && (
          <div>
            <QuickActions
              status={user.status}
              id={user.id}
              isAdmin={user.isAdmin}
              name={user.name}
              image={user.image}
              username={user.username}
            />
          </div>
        )}
      </div>
      <ProfileTabs jobsPosted={user.jobs} applications={user.applicants} />
      <Card className="gap-0">
        <CardHeader className="border-b">
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="mt-3 space-y-4 text-sm font-medium">
          <SubscriptionsList
            initialSubscriptions={subscriptionData.subscriptions}
            initialHasNext={subscriptionData.pagination.hasNext}
            initialTotal={subscriptionData.pagination.total}
            query={query}
          />
        </CardContent>
      </Card>
      <RecentTransactionHistory
        initialPayouts={payoutsData.payouts}
        initialHasNext={payoutsData.pagination.hasNext}
        initialTotal={payoutsData.pagination.total}
        query={query}
      />
    </div>
  );
};

export default page;
