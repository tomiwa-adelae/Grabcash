import Link from "next/link";
import { Footer } from "../_components/Footer";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot password - Grabcash",
};

const page = () => {
  return (
    <div className="container">
      <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl md:text-5xl">Forgot password</h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Enter the email address linked to your grabcash account. We will send
          you a password reset link.
        </p>
      </div>
      <ForgotPasswordForm />
      <p className="text-center text-balance text-muted-foreground text-base mt-6">
        Don't have an account with grabcash?{" "}
        <Link
          href="/register"
          className="hover:underline text-primary font-medium"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default page;
