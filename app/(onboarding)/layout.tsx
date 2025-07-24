import React, { ReactNode } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Header />
			<div className="pt-20">{children}</div>
			<Footer />
		</div>
	);
};

export default layout;
