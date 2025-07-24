import Link from "next/link";
import React from "react";

export const Footer = ({ text }: { text: string }) => {
	return (
		<footer className="container text-sm text-balance text-muted-foreground text-center max-w-2xl mx-auto py-6">
			By {text}, you confirm that you’ve read, understood, and agreed to
			earnsphere’s{" "}
			<Link className="text-primary hover:underline" href="/terms-of-use">
				Terms & Conditions
			</Link>{" "}
			and{" "}
			<Link
				className="text-primary hover:underline"
				href="/privacy-policy"
			>
				Privacy Policy.
			</Link>
		</footer>
	);
};
