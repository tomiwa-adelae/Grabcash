import React from "react";
import { Showcase } from "../_components/Showcase";
import { ContactInformation } from "./_components/ContactInformation";
import { ContactForm } from "./_components/ContactForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Grabcash – We’re Here to Help",
  description:
    "Need support or partnership opportunities? Contact the Grabcash team for quick and friendly assistance.",
};

const page = () => {
  return (
    <div>
      <Showcase
        title={"Contact us"}
        description="Do have a question or feedback? We're here to help you make the most of your earning journey."
        image="/assets/images/contact-img.jpg"
      />
      <ContactInformation />
      <ContactForm />
    </div>
  );
};

export default page;
