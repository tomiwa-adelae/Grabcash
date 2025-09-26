import React, { ReactNode } from "react";
import { Header } from "../(root)/_components/Header";
import { Footer } from "./_components/Footer";
import { PageGradient } from "@/components/PageGradient";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="py-16 md:py-24">
          <PageGradient />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default layout;
