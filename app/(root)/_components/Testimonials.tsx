import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Testimonials = () => {
  return (
    <div className="py-16 md:py-20">
      <div className="container">
        <div className="space-y-2 flex flex-col items-center justify-center text-center">
          <h2 className="font-semibold text-3xl md:text-4xl">Testimonials</h2>
          <p className="text-muted-foreground text-center md:w-3/4 mx-auto">
            We're just getting started, but users are already seeing the value.
            As we grow, we'll showcase real stories from people like
            you—everyday users turning time into income, learning new skills,
            and unlocking online opportunities. our voice could be here soon.
            Join now and be one of our early success stories
          </p>
        </div>
        <div className="mt-8 md:w-3/4 mx-auto grid grid-cols-2 gap-4">
          <Button size="md" asChild>
            <Link href="#">Send a review</Link>
          </Button>
          <Button size="md" variant={"outline"} asChild>
            <Link href="/register">Start Earning Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
