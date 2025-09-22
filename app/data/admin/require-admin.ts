import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserDetails } from "../user/get-user-details";

export const requireAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const user = await getUserDetails();
  if (!user.isAdmin) return redirect("/not-admin");

  return session;
};
