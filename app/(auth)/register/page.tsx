import { RegisterForm } from "./_components/RegisterForm";
import Link from "next/link";
import { Footer } from "../_components/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) return redirect("/");

	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Create an account
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							Start earning money online by completing simple
							tasks.
						</p>
					</div>
					<RegisterForm />
					<p className="text-center text-balance text-muted-foreground text-base mt-6">
						Already using earnsphere?{" "}
						<Link
							href="/login"
							className="hover:underline text-primary font-medium"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
			<Footer text="creating an account" />
		</div>
	);
};

export default page;
