import { getUserDetails } from "@/app/data/user/get-user-details";
import { EditBankInformationForm } from "../../_components/EditBankInformationForm";

const page = async () => {
  const user = await getUserDetails();

  return (
    <div className="py-16 md:py-24 container">
      <h1 className="font-medium text-2xl md:text-3xl">Edit Bank Details</h1>
      <EditBankInformationForm user={user} />
    </div>
  );
};

export default page;
