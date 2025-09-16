import React from "react";
import { NewsLetterForm } from "./NewsLetterForm";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { footer } from "@/constants";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#040403] text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 flex flex-col items-start">
            <h2 className="font-medium text-2xl md:text-4xl">
              Stay in the Loop
            </h2>
            <p className="text-base text-gray-200">
              Join our newsletter to get early access to tasks, exclusive
              offers, platform updates, and tips to earn smarter. No spam — just
              value, straight to your inbox.
            </p>
          </div>
          <NewsLetterForm />
        </div>
        <Separator className="my-12 bg-muted-foreground" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="col-span-2">
            <Logo />
          </div>
          {footer.map(({ title, links }, idx) => (
            <div key={idx}>
              <h4 className="text-base md:text-lg font-medium">{title}</h4>
              <div className="grid gap-4 mt-2 text-sm text-gray-200">
                {links.map(({ slug, label }, index) => (
                  <Link
                    key={index}
                    className="hover:text-primary transition-all"
                    href={slug}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Separator className="mt-12 mb-8 bg-muted-foreground" />
        <p className="text-sm">
          &copy; {year} Earnsphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
