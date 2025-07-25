import Link from "next/link";
import { VerifyCodeForm } from "./_components/VerifyCodeForm";

const page = async ({ searchParams }: { searchParams: any }) => {
	const { email } = await searchParams;
	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Verify code
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							We’ve sent a 6-digit code to {email}
							Please enter it below to continue.
						</p>
					</div>
					<VerifyCodeForm email={email} />
					<p className="text-center text-balance text-muted-foreground text-base mt-6">
						Remember password?{" "}
						<Link
							href="/login"
							className="hover:underline text-primary font-medium"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
