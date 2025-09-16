import {
  EMAIL_ADDRESS,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_NUMBER,
  X_URL,
  YOUTUBE_URL,
} from "@/constants";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Lobster_Two } from "next/font/google";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const ContactInformation = () => {
  return (
    <div className="py-16 md:py-20 bg-[#F3F7FA]">
      <div className="container">
        <h2
          className={`font-medium text-primary text-3xl md:text-4xl ${lobster.className}`}
        >
          Contact information
        </h2>
        <div className="mt-8 grid gap-4 text-base font-medium">
          <p>
            <span className="uppercase italic">Email address:</span>{" "}
            {EMAIL_ADDRESS}
          </p>
          <p>
            <span className="uppercase italic">Contact number: </span>
            {PHONE_NUMBER}
          </p>
          <div className="flex items-start justify-start gap-2">
            <span className="uppercase italic">Social media:</span>{" "}
            <span className="grid gap-4">
              <a
                className="flex items-center justify-start gap-2 hover:text-primary transition-all"
                href={YOUTUBE_URL}
              >
                <Youtube /> Youtube
              </a>
              <a
                className="flex items-center justify-start gap-2 hover:text-primary transition-all"
                href={INSTAGRAM_URL}
              >
                <Instagram /> Instagram
              </a>
              <a
                className="flex items-center justify-start gap-2 hover:text-primary transition-all"
                href={FACEBOOK_URL}
              >
                <Facebook /> Facebook
              </a>
              <a
                className="flex items-center justify-start gap-2 hover:text-primary transition-all"
                href={X_URL}
              >
                <Twitter /> Twitter
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
