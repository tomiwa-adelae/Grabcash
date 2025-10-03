import { RenderDescription } from "@/components/text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import Link from "next/link";

interface Props {
  name: string;
  email: string;
  country: string | null;
  phoneNumber: string | null;
  bio: string | null;
  username: string | null;
  myProfile: boolean;
}

export const PersonalInformation = ({
  name,
  email,
  country,
  phoneNumber,
  bio,
  username,
  myProfile,
}: Props) => {
  return (
    <div className="bg-muted py-8 rounded-lg">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 text-sm text-left">
          <div>
            <h4 className="text-muted-foreground">Name</h4>
            <h4 className="font-medium">{name}</h4>
          </div>
          <div>
            <h4 className="text-muted-foreground">Email</h4>
            <a
              href={`mailto:${email}`}
              className="font-medium hover:underline hover:text-primary transition-all"
            >
              {email}
            </a>
          </div>
          <div>
            <h4 className="text-muted-foreground">Username</h4>
            <h4 className="font-medium">@{username}</h4>
          </div>
          <div>
            <h4 className="text-muted-foreground">Phone number</h4>
            {phoneNumber ? (
              <a
                href={`tel:${phoneNumber}`}
                className="font-medium hover:underline hover:text-primary transition-all"
              >
                {formatPhoneNumber(phoneNumber)}
              </a>
            ) : (
              <span className="italic">No phone number</span>
            )}
          </div>
          <div>
            <h4 className="text-muted-foreground">Bio</h4>
            {bio ? (
              <h4 className="font-medium">
                <RenderDescription json={bio} />
              </h4>
            ) : (
              <span className="italic">No bio</span>
            )}
          </div>
          {myProfile && (
            <div className="flex items-center justify-end pb-8">
              <Button
                size={"md"}
                asChild
                variant={"outline"}
                className="w-full"
              >
                <Link href="/personal-information/edit">Edit Profile</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
