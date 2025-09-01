import { getUserDetails } from "@/app/data/user/get-user-details";
import { PricingPlans } from "./_components/PricingPlans";
import { getSubscriptionPlans } from "@/app/data/user/subscription/get-subscription-plans";

const page = async () => {
  const user = await getUserDetails();
  const plans = await getSubscriptionPlans();

  return (
    <div className="not-prose relative w-full py-16 md:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-3xl" />
      </div>

      <div className="container px-6">
        <div className="space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that Scales with You
          </h1>
          <p>
            Gemini is evolving to be more than just the models. It supports an
            entire suite of APIs and platforms helping developers and businesses
            innovate.
          </p>
        </div>
        <PricingPlans
          plans={plans}
          name={user.name}
          email={user.email}
          phoneNumber={user.phoneNumber}
        />
      </div>
    </div>
  );
};

export default page;
