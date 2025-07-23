import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
	title: any;
	description?: string;
	image: string;
	cta?: {
		slug: string;
		label: string;
		variant?: string;
	}[];
}

export const Showcase = ({ title, description, cta, image }: Props) => {
	return (
		<div className="py-12">
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4 flex flex-col items-start justify-center">
					<h1 className="font-semibold text-4xl md:text-4xl lg:text-6xl">
						{title}
					</h1>
					<p className="text-muted-foreground text-base lg:text-lg leading-snug">
						{description}
					</p>
					{cta && (
						<div className="mt-2 flex items-center justify-center md:justify-start flex-col md:flex-row gap-4 w-full">
							<Button
								size="lg"
								className="w-full md:w-auto"
								asChild
							>
								<Link href={cta[0].slug}>{cta[0].label}</Link>
							</Button>
							<Button
								className="w-full md:w-auto"
								asChild
								size="lg"
								variant={"outline"}
							>
								<Link href="/about">Learn more</Link>
							</Button>
						</div>
					)}
				</div>
				<div>
					<Image
						width={1000}
						height={1000}
						className="object-cover aspect-auto size-full"
						src={image}
						alt="A man holding dollars and a laptop smiling with a green background"
					/>
				</div>
			</div>
		</div>
	);
};
