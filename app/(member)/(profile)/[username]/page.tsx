import { getUserDetails } from "@/app/data/user/get-user-details";
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

type Params = Promise<{
  username: string;
}>;

const page = async ({ params }: { params: Params }) => {
  const { username } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUserDetails(username);
  const jobs = await getAvailableJobs();

  const myProfile = username === session?.user.username;

  return (
    <div className="py-16 md:py-32 container">
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
                className="rounded-lg bg-secondary text-black"
              />
              <Button size="md" className="rounded-full">
                Follow
              </Button>
              <Button asChild size="md" variant={"secondary"}>
                <Link href={`mailto:${user.email}`}>
                  <IconMessage />
                </Link>
              </Button>
            </div>
          )}
          <div className="mt-6 text-sm md:text-base text-muted-foreground space-y-2.5">
            <p>
              <span className="text-black">Joined:</span>{" "}
              {formatDate(user.createdAt)}
            </p>
            {user.country && (
              <p>
                <span className="text-black">Country:</span> {user.country}
              </p>
            )}
            {user.bio && (
              <p>
                <RenderDescription json={user.bio} />
              </p>
            )}
          </div>
        </div>
        <ProfileTabs myProfile={myProfile} user={user} jobs={jobs} />
      </div>
    </div>
  );
};

export default page;
