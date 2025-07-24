import { OnBoardingIdentityForm } from "./_components/OnBoardingIdentityForm";

const page = () => {
	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Verify your identity
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							To keep your account secure and enable withdrawals,
							we need to verify your identity. This is a quick,
							one-time step and your details are safe with us.
						</p>
					</div>
					<OnBoardingIdentityForm />
				</div>
			</div>
		</div>
	);
};

export default page;
