import React, { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Footer } from "../(root)/_components/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
