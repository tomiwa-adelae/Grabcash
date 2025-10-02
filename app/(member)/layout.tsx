import React, { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Footer } from "../(root)/_components/Footer";
import { PageGradient } from "@/components/PageGradient";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div className="relative">
          <PageGradient />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default layout;
