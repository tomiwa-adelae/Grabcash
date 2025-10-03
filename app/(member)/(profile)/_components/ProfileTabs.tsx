import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInformation } from "./PersonalInformation";
import { BankDetails } from "./BankDetails";
import { SocialMedia } from "./SocialMedia";
import { Jobs } from "./Jobs";
import { GetUserProfileType } from "@/app/data/user/get-user-profile";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  query: string;
  user: GetUserProfileType;
  myProfile: boolean;
}

export const ProfileTabs = ({ user, query, myProfile }: Props) => {
  const myProfileTab = [
    {
      label: "Personal Information",
      value: "Personal Information",
    },
    {
      label: "Bank Details",
      value: "Bank Details",
    },
    {
      label: "Social Media",
      value: "Social Media",
    },
    {
      label: "Jobs",
      value: "Jobs",
    },
  ];

  const visitingProfileTab = [
    {
      label: "Personal Information",
      value: "Personal Information",
    },
    {
      label: "Social Media",
      value: "Social Media",
    },
  ];

  return (
    <div className="mt-8 w-full">
      <Tabs defaultValue="Personal Information">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            {(myProfile ? myProfileTab : visitingProfileTab).map(
              ({ label, value }, index) => (
                <TabsTrigger
                  key={index}
                  value={value}
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none h-11 cursor-pointer text-xs"
                >
                  {label}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent className="w-full" value="Personal Information">
          <PersonalInformation
            myProfile={myProfile}
            name={user.name}
            email={user.email}
            phoneNumber={user.phoneNumber}
            bio={user.bio}
            country={user.country}
            username={user.username}
          />
        </TabsContent>
        <TabsContent className="w-full" value="Bank Details">
          <BankDetails
            myProfile={myProfile}
            accountName={user.accountName}
            accountNumber={user.accountNumber}
            bankName={user.bankName}
          />
        </TabsContent>
        <TabsContent className="w-full" value="Social Media">
          <SocialMedia myProfile={myProfile} socialMedia={user.socials} />
        </TabsContent>
        <TabsContent className="w-full" value="Jobs">
          <Jobs query={query} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
