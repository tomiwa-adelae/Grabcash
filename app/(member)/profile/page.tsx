import { getUserDetails } from "@/app/data/user/get-user-details";
import { ProfilePicture } from "./_components/ProfilePicture";
import { ShareButton } from "@/components/ShareButton";
import { formatDate } from "@/lib/utils";
import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { ProfileTabs } from "./_components/ProfileTabs";
import { getAvailableJobs } from "@/app/data/job/get-available-jobs";

const page = async () => {
  const user = await getUserDetails();
  const jobs = await getAvailableJobs();

  return (
    <div className="py-12 container">
      <div className="flex flex-col items-center justify-center w-full">
        <ProfilePicture image={user.image} name={user.name} />
        <div className="mt-8 flex flex-col items-center justify-center text-center space-y-4 w-full">
          <div>
            <h1 className="font-medium text-2xl md:text-3xl">{user.name}</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              @{user.username}
            </p>
          </div>
          <ShareButton links={user.socials} />
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
        <ProfileTabs user={user} jobs={jobs} />
      </div>
    </div>
  );
};

export default page;
