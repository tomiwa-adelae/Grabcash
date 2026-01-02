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
    title: "How do I get started?",
    content:
      "Create a free account, complete KYC verification, and browse tasks or campaigns to begin earning.",
  },
  {
    id: "2",
    title: "Is KYC required?",
    content: "How do payouts work?",
  },
  {
    id: "3",
    title: "What’s the difference between free and subscribed plans?",
    content:
      "Free users get access to basic features. Subscribed users (₦8,000/year) unlock advanced campaigns, exclusive jobs, higher limits, and educational courses.",
  },
  {
    id: "4",
    title: "Can I earn without doing tasks?",
    content:
      "Yes! Join the affiliate program, invite friends, and earn commissions from purchases or sign-ups.",
  },
];

interface Props {
  showTitle?: boolean;
}

export const FAQs = ({ showTitle }: Props) => {
  return (
    <div className="bg-[#faf3f6] py-16">
      <div className="container">
        {showTitle && (
          <h2 className="dark:text-black mb-8 font-semibold text-3xl md:text-4xl text-center">
            <span className={`${lobster.className} text-primary font-normal`}>
              grabcash
            </span>{" "}
            FAQs
          </h2>
        )}
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full grid gap-2"
            defaultValue="3"
          >
            {items.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="py-2">
                <AccordionTrigger className="hover:no-underline">
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
