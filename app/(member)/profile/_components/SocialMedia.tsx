import { Button } from "@/components/ui/button";
import { Socials } from "@/lib/generated/prisma";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface Props {
  socialMedia: Socials[] | any;
}

export const SocialMedia = ({ socialMedia }: Props) => {
  const getSocialIcon = (url: string) => {
    if (url.includes("twitter") || url.includes("x.com"))
      return <Twitter className="w-4 h-4 inline-block mr-2" />;
    if (url.includes("instagram"))
      return <Instagram className="w-4 h-4 inline-block mr-2" />;
    if (url.includes("github"))
      return <Github className="w-4 h-4 inline-block mr-2" />;
    if (url.includes("linkedin"))
      return <Linkedin className="w-4 h-4 inline-block mr-2" />;
    if (url.includes("youtube"))
      return <Youtube className="w-4 h-4 inline-block mr-2" />;
    return <Globe className="w-4 h-4 inline-block mr-2" />;
  };

  return (
    <div className="bg-muted py-8 rounded-lg">
      <div className="container">
        <div className="flex items-center justify-end pb-8">
          <Button size={"md"} asChild variant={"outline"}>
            <Link href="/profile/social-media/edit">Edit Details</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 text-sm text-left">
          {socialMedia.map(
            ({ id, url }: { id: string; url: string }, index: string) => (
              <div key={index}>
                <a
                  href={url}
                  target="_blank"
                  className="font-medium hover:underline hover:text-primary transition-all"
                >
                  {getSocialIcon(url)}
                  {url}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
