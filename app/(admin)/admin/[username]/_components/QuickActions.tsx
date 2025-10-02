"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { IconBan, IconTrash } from "@tabler/icons-react";
import { UserStatus } from "@/lib/generated/prisma";
import { useConfetti } from "@/hooks/use-confetti";
import { tryCatch } from "@/hooks/use-try-catch";
import { activateUser, promoteUser, suspendUser } from "../../actions";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { DeleteUserModal } from "@/app/(admin)/_components/DeleteUserModal";

interface Props {
  status: UserStatus;
  isAdmin: boolean;
  id: string;
  name: string;
  username: string | null;
  image: string | null;
}

export const QuickActions = ({
  status,
  id,
  isAdmin,
  username,
  image,
  name,
}: Props) => {
  const [suspendPending, startSuspendTransition] = useTransition();
  const [activatePending, startActivateTransition] = useTransition();
  const [promotePending, startPromoteTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { triggerConfetti } = useConfetti();

  const handleSuspendUser = () => {
    startSuspendTransition(async () => {
      const { data: result, error } = await tryCatch(suspendUser(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleActivateUser = () => {
    startActivateTransition(async () => {
      const { data: result, error } = await tryCatch(activateUser(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handlePromoteUser = () => {
    startPromoteTransition(async () => {
      const { data: result, error } = await tryCatch(promoteUser(id));

      if (error) {
        toast.error(error.message || "Oops! Internal server error");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-3">
        {status === "ACTIVE" && (
          <Button
            variant="outline"
            size={"md"}
            className={`w-full justify-start hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all duration-200`}
            onClick={handleSuspendUser}
            disabled={suspendPending}
          >
            {suspendPending ? (
              <Loader text="Suspending..." />
            ) : (
              <>
                <IconBan className={`mr-2 h-5 w-5 text-yellow-500`} />
                <span className="font-medium">Suspend account</span>
              </>
            )}
          </Button>
        )}
        {status === "SUSPENDED" && (
          <Button
            variant="outline"
            size={"md"}
            className={`w-full justify-start hover:bg-orange-500/10 hover:border-orange-500/50 transition-all duration-200`}
            onClick={handleActivateUser}
            disabled={activatePending}
          >
            {activatePending ? (
              <Loader text="Activating..." />
            ) : (
              <>
                <IconBan className={`mr-2 h-5 w-5 text-orange-500`} />
                <span className="font-medium">Activate account</span>
              </>
            )}
          </Button>
        )}
        {status !== "DELETED" && (
          <Button
            variant="outline"
            size={"md"}
            className={`w-full justify-start hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-200`}
            onClick={() => setOpenDeleteModal(true)}
          >
            <IconTrash className={`mr-2 h-5 w-5 text-destructive`} />
            <span className="font-medium">Delete account</span>
          </Button>
        )}
        {!isAdmin && (
          <Button
            variant="outline"
            size={"md"}
            className={`w-full justify-start hover:bg-primary/10 hover:border-primary/50 transition-all duration-200`}
            onClick={handlePromoteUser}
            disabled={promotePending}
          >
            {promotePending ? (
              <Loader text="Promoting..." />
            ) : (
              <>
                <IconBan className={`mr-2 h-5 w-5 text-primary`} />
                <span className="font-medium">Promote user to admin</span>
              </>
            )}
          </Button>
        )}
      </CardContent>
      {/* Modal rendered outside the table */}
      {openDeleteModal && (
        <DeleteUserModal
          open={openDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
          username={username}
          name={name}
          image={image}
          id={id}
        />
      )}
    </Card>
  );
};
