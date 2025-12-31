"use client";
import { formatDate, formatMoneyInput } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReferralAuditList({ initialData }: { initialData: any[] }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Referrer</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={payout.User.image} />
                    <AvatarFallback>{payout.User.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{payout.User.name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{payout.User.username}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-4">{payout.title}</TableCell>
              <TableCell className="font-semibold text-green-600">
                ₦{formatMoneyInput(payout.amount)}
              </TableCell>
              <TableCell>{formatDate(payout.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Badge variant="success">VERIFIED</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
