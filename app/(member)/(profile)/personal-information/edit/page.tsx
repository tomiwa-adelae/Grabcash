import { getUserDetails } from "@/app/data/user/get-user-details";
import { EditPersonalInformationForm } from "../../_components/EditPersonalInformationForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Persona information - Grabcash",
};

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-16 md:py-24 container">
      <h1 className="font-medium text-2xl md:text-3xl">
        Edit Personal Information
      </h1>
      <EditPersonalInformationForm user={user} />
    </div>
  );
};

export default page;
