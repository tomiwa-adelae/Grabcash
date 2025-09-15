import { getUserDetails } from "@/app/data/user/get-user-details";
import { EditPersonalInformationForm } from "../../_components/EditPersonalInformationForm";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-12 container">
      <h1 className="font-medium text-2xl md:text-3xl">Personal Information</h1>
      <EditPersonalInformationForm user={user} />
    </div>
  );
};

export default page;
