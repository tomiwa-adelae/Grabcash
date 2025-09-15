import { getUserDetails } from "@/app/data/user/get-user-details";
import { EditSocialMediaForm } from "../../_components/EditSocialMediaForm";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-12 container">
      <h1 className="font-medium text-2xl md:text-3xl">Social Media</h1>
      <EditSocialMediaForm user={user} />
    </div>
  );
};

export default page;
