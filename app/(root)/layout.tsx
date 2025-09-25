import React, { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { PageGradient } from "@/components/PageGradient";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-20 relative">
        <PageGradient />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
