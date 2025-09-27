import Link from "next/link";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { email, token } = await searchParams;
  return (
    <div className="container">
      <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl md:text-5xl">
          Create new password
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Enter a strong new password for your grabcash account.
        </p>
      </div>
      <ResetPasswordForm email={email} token={token} />
      <p className="text-center text-balance text-muted-foreground text-base mt-6">
        Remember password?{" "}
        <Link
          href="/login"
          className="hover:underline text-primary font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default page;
