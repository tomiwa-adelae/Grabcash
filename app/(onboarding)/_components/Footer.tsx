import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="container text-sm text-balance text-muted-foreground text-center py-6">
      By continuing, you confirm that you’ve read, understood, and agreed to
      grabcash’s{" "}
      <Link className="text-primary hover:underline" href="/terms-of-use">
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link className="text-primary hover:underline" href="/privacy-policy">
        Privacy Policy.
      </Link>
    </footer>
  );
};
