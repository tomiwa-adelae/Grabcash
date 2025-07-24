import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { howDetails } from "@/constants";
import { BriefcaseBusiness } from "lucide-react";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
	subsets: ["latin"],
	weight: ["400", "700"],
});

interface Props {
	title: any;
	description?: string;
}

export const How = ({ title, description }: Props) => {
	return (
		<div className="bg-primary py-12">
			<div className="container">
				<div className="space-y-2 flex flex-col items-center justify-center text-center text-white">
					<h2 className="font-semibold text-3xl md:text-4xl">
						{title}
					</h2>
					<p className="text-muted text-center md:w-3/4 mx-auto">
						{description}
					</p>
				</div>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
					{howDetails.map(
						({ title, icon, subTitle, description }, index) => {
							const Icon = icon;
							return (
								<Card key={index} className="gap-0 py-10">
									<CardHeader>
										<Icon />
										<CardTitle className="text-lg md:text-xl mt-2">
											{title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm my-2">
											{subTitle}
										</p>
										<CardDescription className="leading-relaxed text-base">
											{description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
};
