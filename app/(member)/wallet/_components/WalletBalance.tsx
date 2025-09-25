"use client";
import { NairaIcon } from "@/components/NairaIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { DEFAULT_MINIMUM_PAYOUT, DEFAULT_WITHDRAWAL_FEE } from "@/constants";
import { formatMoneyInput } from "@/lib/utils";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { PayoutModal } from "./PayoutModal";
import { SetWithdrawalPinModal } from "../../_components/SetWithdrawalPinModal";

interface Props {
  lifeTimeEarnings: number;
  earnings: number;
  withdrawalPin: string | null;
  bankName: string | null;
  accountNumber: string | null;
}

export const WalletBalance = ({
  lifeTimeEarnings,
  earnings,
  bankName,
  accountNumber,
  withdrawalPin,
}: Props) => {
  const [showBalance, setShowBalance] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("history");
    if (el) {
      const headerOffset = 100; // height of your fixed header in px
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Card
        style={{ backgroundImage: `url(/assets/images/wallet-bg.jpg)` }}
        className="text-white"
      >
        <CardContent className="py-4">
          <CardDescription>Earnsphere Wallet Balance</CardDescription>
          <div className="flex items-center justify start gap-2">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-4">
              <NairaIcon />
              {showBalance ? `${formatMoneyInput(earnings)}` : "****"}
            </h1>
            <Button
              onClick={() => setShowBalance(!showBalance)}
              size="icon"
              variant={"secondary"}
            >
              {showBalance ? <IconEyeClosed /> : <IconEye />}
            </Button>
          </div>

          <div className="space-y-2.5 mt-8">
            <p className="text-sm md:text-base">
              Minimum payout: <NairaIcon />
              {formatMoneyInput(DEFAULT_MINIMUM_PAYOUT)}
            </p>
            <p className="text-sm md:text-base">
              Withdraw fee: {DEFAULT_WITHDRAWAL_FEE}%
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() =>
                withdrawalPin
                  ? setOpenModal(true)
                  : setOpenWithdrawalModal(true)
              }
              size="md"
              className="w-full"
            >
              Request Payout
            </Button>
            <Button
              onClick={handleClick}
              size="md"
              variant={"secondary"}
              className="w-full text"
            >
              Transaction history
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="py-6 text-center text-base text-muted-foreground">
        Lifetime earnings: <NairaIcon />
        {showBalance ? `${formatMoneyInput(lifeTimeEarnings)}` : "****"}
      </p>

      {!withdrawalPin && (
        <SetWithdrawalPinModal
          open={openWithdrawalModal}
          closeModal={() => setOpenWithdrawalModal(false)}
        />
      )}

      {openModal && (
        <PayoutModal
          open={openModal}
          closeModal={() => setOpenModal(false)}
          earnings={earnings}
          bankName={bankName}
          accountNumber={accountNumber}
        />
      )}
    </div>
  );
};
