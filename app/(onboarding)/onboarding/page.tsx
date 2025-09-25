import { getUserDetails } from "@/app/data/user/get-user-details";
import { OnBoardingProfileForm } from "./_components/OnboardingProfileForm";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-16 md:py-32">
      <div className="container">
        <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-4xl md:text-5xl">
            Complete Registration
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            You’re almost there. Complete your grabcash profile.
          </p>
        </div>
        <OnBoardingProfileForm user={user} />
      </div>
    </div>
  );
};

export default page;
