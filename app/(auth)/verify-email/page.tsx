import Link from "next/link";
import { VerifyCodeForm } from "./_components/VerifyCodeForm";

const page = () => {
	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Verify email
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							We’ve sent a 6-digit verification code to your
							email. You can check your spam or promotions folder
							just in case. Please enter the code below to verify
							your account.
						</p>
					</div>
					<VerifyCodeForm />
				</div>
			</div>
		</div>
	);
};

export default page;
