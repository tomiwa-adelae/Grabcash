import { LoginForm } from "./_components/LoginForm";
import Link from "next/link";
import { Footer } from "../_components/Footer";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect("/");
  return (
    <div className="container">
      <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl md:text-5xl">Login</h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Start earning money online by completing simple tasks.
        </p>
      </div>
      <LoginForm />
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
