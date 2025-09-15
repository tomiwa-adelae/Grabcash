import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
}

export const BankDetails = ({
  accountName,
  accountNumber,
  bankName,
}: Props) => {
  return (
    <div className="bg-muted py-8 rounded-lg">
      <div className="container">
        <div className="flex items-center justify-end pb-8">
          <Button size={"md"} asChild variant={"outline"}>
            <Link href="/profile/bank-details/edit">Edit Bank Details</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 text-sm text-left">
          <div>
            <h4 className="text-muted-foreground">Account Name</h4>
            <h4 className="font-medium">{accountName}</h4>
          </div>
          <div>
            <h4 className="text-muted-foreground">Account Number</h4>
            <h4 className="font-medium">{accountNumber}</h4>
          </div>
          <div>
            <h4 className="text-muted-foreground">Bank Name</h4>
            <h4 className="font-medium">{bankName}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
