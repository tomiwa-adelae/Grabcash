import { Showcase } from "../_components/Showcase";
import { How } from "../_components/How";
import { GetStarted } from "./_components/GetStarted";
import { FAQs } from "../_components/FAQs";
import { Testimonials } from "../_components/Testimonials";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const page = () => {
	return (
		<div>
			<Showcase
				title={
					<>
						Earn, Learn & Grow with{" "}
						<span
							className={`${lobster.className} text-primary font-normal`}
						>
							earnsphere.
						</span>
					</>
				}
				description="Join thousands of users earning daily by completing
						micro-tasks, unlocking cashback deals, taking
						performance courses, and earning real income — all in
						one place."
				cta={[
					{ slug: "/register", label: "Get started" },
					{ slug: "/about", label: "Learn more", variant: "outline" },
				]}
				image={"/assets/images/hero-img.jpg"}
			/>
			<How
				title={
					<>
						How{" "}
						<span className={`${lobster.className} font-normal`}>
							earnsphere
						</span>{" "}
						works
					</>
				}
				description="Earn real income by completing simple tasks, discovering
												cashback offers, and joining campaigns from verified
												brands — all with easy steps and no experience needed.
												Whether you’re scrolling from home or working on the go,
												your daily effort translates directly into real income."
			/>
			<GetStarted />
			<FAQs />
			<Testimonials />
		</div>
	);
};

export default page;
