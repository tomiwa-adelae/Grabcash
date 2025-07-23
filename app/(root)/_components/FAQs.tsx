import { Lobster_Two } from "next/font/google";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const lobster = Lobster_Two({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const items = [
	{
		id: "1",
		title: "What makes Origin UI different?",
		content:
			"Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
	},
	{
		id: "2",
		title: "How can I customize the components?",
		content:
			"Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
	},
	{
		id: "3",
		title: "Is Origin UI optimized for performance?",
		content:
			"Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
	},
	{
		id: "4",
		title: "How accessible are the components?",
		content:
			"All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
	},
];

interface Props {
	showTitle?: boolean;
}

export const FAQs = ({ showTitle }: Props) => {
	return (
		<div className="bg-[#F3F7FA] py-12">
			<div className="container">
				{showTitle && (
					<h2 className="font-semibold text-3xl md:text-4xl text-center">
						<span
							className={`${lobster.className} text-primary font-normal`}
						>
							earnsphere
						</span>{" "}
						FAQs
					</h2>
				)}
				<div className="mt-8">
					<Accordion
						type="single"
						collapsible
						className="w-full grid gap-4"
						defaultValue="3"
					>
						{items.map((item) => (
							<AccordionItem
								value={item.id}
								key={item.id}
								className="py-2"
							>
								<AccordionTrigger className="leading-6 hover:no-underline">
									{item.title}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground pb-2">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};
