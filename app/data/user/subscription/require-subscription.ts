import { redirect } from "next/navigation";
import { getUserDetails } from "../get-user-details";

export const requireSubscription = async () => {
  const user = await getUserDetails();

  if (
    user.subscription?.plan.name === "Basic" ||
    user.subscription === null ||
    !user.isAdmin
  )
    return redirect("/subscriptions");

  return;
};
