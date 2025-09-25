import React, { ReactNode } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageGradient } from "@/components/PageGradient";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  return (
    <div>
      <Header />
      <div className="pt-20 relative min-h-screen">
        <PageGradient />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default layout;
