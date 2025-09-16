"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Button } from "./ui/button";
import Link from "next/link";
import EmptyAnimation from "@/public/assets/animations/empty-animation.json";
import { useRef } from "react";

interface Props {
  icon?: any;
  title: string;
  description?: string;
  buttonText?: string;
  buttonSlug?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  buttonSlug,
  buttonText,
}: Props) => {
  const Icon = icon;
  const animationRef = useRef<LottieRefCurrentProps>(null);
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div className="h-60 w-60">
        <Lottie lottieRef={animationRef} animationData={EmptyAnimation} />
      </div>
      <div className="space-y-2 mt-20 z-20">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        {buttonSlug && buttonText && (
          <Button asChild size={"md"}>
            <Link href={buttonSlug}>
              {icon && <Icon />}
              {buttonText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
