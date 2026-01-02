import { How } from "../_components/How";
import { Showcase } from "../_components/Showcase";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Grabcash – Your Partner for Online Micro Jobs",
  description:
    "Grabcash connects people with businesses by offering simple tasks anyone can do. Learn more about our mission and impact.",
};

const page = () => {
  return (
    <div>
      <Showcase
        title="About us"
        description="We are on a mission to make online earning accessible, rewarding, and transparent. Our platform connects individuals with verified jobs, rewarding campaigns, and affiliate opportunities while promoting financial literacy through educational resources."
        image={"/assets/images/hero-image.jpeg"}
      />
      <How
        title={<>What we offer</>}
        description="Earn real income by completing simple tasks, discovering cashback offers, and joining campaigns from verified brands — all with easy steps and no experience needed. Whether you’re scrolling from home or working on the go, your daily effort translates directly into real income."
      />
    </div>
  );
};

export default page;
