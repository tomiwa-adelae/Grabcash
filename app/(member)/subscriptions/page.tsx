import { getUserDetails } from "@/app/data/user/get-user-details";
import { PricingPlans } from "./_components/PricingPlans";
import { getSubscriptionPlans } from "@/app/data/user/subscription/get-subscription-plans";
import { PageGradient } from "@/components/PageGradient";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const page = async () => {
  const user = await getUserDetails();
  const plans = await getSubscriptionPlans();

  if (!user.onboardingCompleted) return redirect("/onboarding");

  return (
    <div className="not-prose relative w-full py-16 md:py-32">
      <PageGradient />

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
