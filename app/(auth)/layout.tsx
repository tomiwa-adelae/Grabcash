import React, { ReactNode } from "react";
import { Header } from "../(root)/_components/Header";
import { Footer } from "./_components/Footer";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Header />
			<div className="pt-20">{children}</div>
		</div>
	);
};

export default layout;
