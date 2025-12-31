// "use client";

// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Copy } from "lucide-react";

// export function ReferralCard({ referralCode }: { referralCode: string }) {
//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralCode);
//     toast.success("Referral code copied!");
//   };

//   return (
//     <div className="mt-4 p-4 bg-primary/5 border border-dashed border-primary/20 rounded-lg w-full max-w-sm">
//       <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
//         Your Referral Code
//       </p>
//       <div className="flex items-center justify-between mt-1 gap-4">
//         <code className="text-lg font-bold text-primary bg-background px-2 py-1 rounded border">
//           {referralCode}
//         </code>
//         <Button variant="outline" size="sm" onClick={handleCopy}>
//           <Copy className="size-4 mr-2" />
//           Copy
//         </Button>
//       </div>
//       <p className="text-xs text-muted-foreground mt-2">
//         Earn ₦500 for every friend who joins using your code.
//       </p>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Link as LinkIcon } from "lucide-react";
import { env } from "@/lib/env";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCopy } from "@tabler/icons-react";

export function ReferralCard({ referralCode }: { referralCode: string }) {
  // Construct the full URL
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-2">
          <LinkIcon className="text-primary" size={18} />
          Refer & Earn ₦500
        </CardTitle>
        <CardDescription className="text-left">
          Share your link with friends
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md border border-dashed">
          <code className="text-xs truncate flex-1">{referralLink}</code>
          <Button size="icon" variant="secondary" onClick={copyLink}>
            <IconCopy />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
