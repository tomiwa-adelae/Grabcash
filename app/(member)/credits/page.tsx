import { PageHeader } from "../_components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="py-16 md:py-24 container">
      <PageHeader title="Your Credit Wallet" />
      <p className="text-base text-muted-foreground mt-1.5">
        Credits are used to post jobs, promote offers, and more. Each credit is
        equivalent to ₦200.00. You can purchase credits or redeem gift cards to
        add to your balance.
      </p>
      <Separator className="my-6" />
      <h2 className="italic text-primary font-medium uppercase">
        Available Credit Balance
      </h2>
      <h2 className="font-semibold text-3xl md:text-4xl mt-2.5">25</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Button
          size={"md"}
          variant={"outline"}
          className="border-primary hover:bg-primary/10 w-full"
        >
          Redeem Gift Card{" "}
        </Button>
        <Button size="md" asChild className="w-full">
          <Link href={`/credits/buy`}>Buy new Credits</Link>
        </Button>
      </div>
      <Button className="mt-4 w-full" size="md" asChild variant={"black"}>
        <Link href="/new-job">Purchase a Gift Card</Link>
      </Button>
    </div>
  );
};

export default page;
