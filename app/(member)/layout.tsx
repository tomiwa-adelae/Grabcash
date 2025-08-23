import React, { ReactNode } from "react";
import { Header } from "./_components/Header";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default layout;
