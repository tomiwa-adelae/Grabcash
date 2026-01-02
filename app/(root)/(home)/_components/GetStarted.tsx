import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const GetStarted = () => {
  return (
    <div className="py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Get started in{" "}
            <span className={`${lobster.className} text-primary font-normal`}>
              easy steps
            </span>{" "}
          </h2>
          <div className="my-6 grid gap-4 text-base text-muted-foreground">
            <div className="flex items-center justify-start gap-2">
              <div className="inline-block rounded-full text-sm py-1 px-2 text-primary border border-primary">
                01
              </div>
              <p>Sign up & verify your identity</p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="inline-block rounded-full text-sm py-1 px-2 text-primary border border-primary">
                02
              </div>
              <p>Choose from hundreds of verified jobs</p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="inline-block rounded-full text-sm py-1 px-2 text-primary border border-primary">
                03
              </div>
              <p>Complete tasks, earn credits, and cash out weekly</p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="inline-block rounded-full text-sm py-1 px-2 text-primary border border-primary">
                04
              </div>
              <p>Boost your earnings with affiliate sales and cashback</p>
            </div>
          </div>
          <Button asChild size="md">
            <Link href="/register">Ready to earn? Let's go!</Link>
          </Button>
        </div>
        <div>
          <Image
            width={1000}
            height={1000}
            className="object-cover aspect-auto size-full"
            src={"/assets/images/get-started-img.jpg"}
            alt="A woman on her phone after winning a cashback reward and smiling"
          />
        </div>
      </div>
    </div>
  );
};
