import { VerifyEmailForm } from "./_components/VerifyEmailForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: { searchParams: any }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");
  const { email } = await searchParams;
  return (
    <div className="container">
      <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl md:text-5xl">Verify email</h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          We’ve sent a 6-digit verification code to your email. You can check
          your spam or promotions folder just in case. Please enter the code
          below to verify your account.
        </p>
      </div>
      <VerifyEmailForm email={email} />
    </div>
  );
};

export default page;
