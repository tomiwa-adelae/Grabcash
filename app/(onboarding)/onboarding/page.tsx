import { getUserDetails } from "@/app/data/user/get-user-details";
import { OnBoardingProfileForm } from "./_components/OnboardingProfileForm";

const page = async () => {
	const user = await getUserDetails();

	return (
		<div>
			<div className="pt-12 pb-8">
				<div className="container">
					<div className="space-y-2.5 flex flex-col items-center justify-center text-center">
						<h1 className="font-semibold text-4xl md:text-5xl">
							Complete Registration
						</h1>
						<p className="text-base text-muted-foreground max-w-2xl">
							You’re almost there. Complete your earnsphere
							profile.
						</p>
					</div>
					<OnBoardingProfileForm user={user} />
				</div>
			</div>
		</div>
	);
};

export default page;
