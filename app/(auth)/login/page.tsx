import React from "react";
import { LoginForm } from "./_components/LoginForm";
import Link from "next/link";
import { Footer } from "../_components/Footer";

const page = () => {
	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Login
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							Start earning money online by completing simple
							tasks.
						</p>
					</div>
					<LoginForm />
					<p className="text-center text-balance text-muted-foreground text-base mt-6">
						Don't have an account with earnsphere?{" "}
						<Link
							href="/register"
							className="hover:underline text-primary font-medium"
						>
							Create an account
						</Link>
					</p>
				</div>
			</div>
			<Footer text="continuing" />
		</div>
	);
};

export default page;
