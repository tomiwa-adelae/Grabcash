import { AllJobsList } from "@/app/(admin)/_components/AllJobsList";
import { AllSubmissionsList } from "@/app/(admin)/_components/AllSubmissionsList";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  jobsPosted: any;
  applications: any;
}

export const ProfileTabs = ({ jobsPosted, applications }: Props) => {
  const tabs = [
    {
      label: `Job submitted (${applications.length})`,
      value: "Job submitted",
    },
    {
      label: `Job posted (${jobsPosted.length})`,
      value: "Job posted",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="Job submitted">
          <TabsList className="text-foreground h-auto gap-2 rounded-none border-b w-full px-0 py-1">
            {tabs.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none h-11 cursor-pointer"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent className="w-full" value="Job submitted">
            <AllSubmissionsList
              initialSubmissions={applications}
              initialHasNext={false}
              initialTotal={0}
              query={""}
            />
            {applications.length === 0 && (
              <EmptyState
                title="No submissions yet"
                description="User has not submitted any job yet. They would appear here once they do"
              />
            )}
          </TabsContent>
          <TabsContent className="w-full" value="Job posted">
            <AllJobsList
              initialJobs={jobsPosted}
              initialHasNext={false}
              initialTotal={0}
              query={""}
            />
            {jobsPosted.length === 0 && (
              <EmptyState
                title="No jobs"
                description="User has not posted any job yet. They would appear here once they do"
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
