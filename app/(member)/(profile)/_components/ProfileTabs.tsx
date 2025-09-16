import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInformation } from "./PersonalInformation";
import { GetUserDetailsType } from "@/app/data/user/get-user-details";
import { BankDetails } from "./BankDetails";
import { SocialMedia } from "./SocialMedia";
import { GetAvailableJobsType } from "@/app/data/job/get-available-jobs";
import { Jobs } from "./Jobs";

interface Props {
  jobs: GetAvailableJobsType[];
  user: GetUserDetailsType;
  myProfile: boolean;
}

export const ProfileTabs = ({ user, jobs, myProfile }: Props) => {
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
      <Tabs
        defaultValue="Personal Information"
        className="hidden md:flex items-center w-full"
      >
        <TabsList className="text-foreground h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          {(myProfile ? myProfileTab : visitingProfileTab).map(
            ({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none h-11 cursor-pointer"
              >
                {label}
              </TabsTrigger>
            )
          )}
        </TabsList>

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
          <Jobs jobs={jobs} />
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:hidden">
        {(myProfile ? myProfileTab : visitingProfileTab).map(
          ({ value, label }) => (
            <Card key={value} className="w-full">
              <Collapsible defaultOpen={value === "Personal Information"}>
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle>{label}</CardTitle>
                  <CollapsibleTrigger>
                    <Button variant="outline" size="icon">
                      <ChevronDown />
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="text-sm space-y-3">
                    {value === "Personal Information" && (
                      <PersonalInformation
                        name={user.name}
                        email={user.email}
                        phoneNumber={user.phoneNumber}
                        bio={user.bio}
                        country={user.country}
                        username={user.username}
                        myProfile={myProfile}
                      />
                    )}
                    {value === "Bank Details" && (
                      <BankDetails
                        accountName={user.accountName}
                        accountNumber={user.accountNumber}
                        bankName={user.bankName}
                        myProfile={myProfile}
                      />
                    )}
                    {value === "Social Media" && (
                      <SocialMedia
                        socialMedia={user.socials}
                        myProfile={myProfile}
                      />
                    )}
                    {value === "Jobs" && <Jobs jobs={jobs} />}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        )}
      </div>
    </div>
  );
};
