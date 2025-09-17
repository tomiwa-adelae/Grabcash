import { getUserDetails } from "@/app/data/user/get-user-details";
import { OnBoardingIdentityForm } from "./_components/OnBoardingIdentityForm";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-16 md:py-32">
      <div className="container">
        <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-4xl md:text-5xl">
            Verify your identity
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            To keep your account secure and enable withdrawals, we need to
            verify your identity. This is a quick, one-time step and your
            details are safe with us.
          </p>
        </div>
        <OnBoardingIdentityForm user={user} />
      </div>
    </div>
  );
};

export default page;
