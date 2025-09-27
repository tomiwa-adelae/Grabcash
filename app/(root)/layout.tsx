import React, { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Header as MemberHeader } from "../(member)/_components/Header";
import { Footer } from "./_components/Footer";
import { PageGradient } from "@/components/PageGradient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      {session === null ? <Header /> : <MemberHeader />}
      <div className="pt-20 relative">
        <PageGradient />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
