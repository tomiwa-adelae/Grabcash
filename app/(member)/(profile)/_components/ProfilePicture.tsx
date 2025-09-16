"use client";
import { saveProfilePicture } from "@/app/(onboarding)/onboarding/actions";
import { Uploader, UploaderHandle } from "@/components/file-uploader/Uploader";
import { Loader } from "@/components/Loader";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { tryCatch } from "@/hooks/use-try-catch";
import { cn } from "@/lib/utils";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  image: string | null;
  name: string;
  myProfile: boolean;
}

export const ProfilePicture = ({ image, name, myProfile }: Props) => {
  const uploaderRef = useRef<UploaderHandle>(null);

  const profilePicture = useConstructUrl(image);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [showChange, setShowChange] = useState<boolean>(false);
  const [hasNewPhoto, setHasNewPhoto] = useState<boolean>(false);

  const [pending, startTransition] = useTransition();

  const onSubmit = (uploadedImageKey: string | string[]) => {
    const imageKey = Array.isArray(uploadedImageKey)
      ? uploadedImageKey[0]
      : uploadedImageKey;

    if (!imageKey) {
      toast.error("No picture to save");
      return;
    }

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        saveProfilePicture(imageKey)
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setOpenModal(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <div className="bg-primary/20 rounded-full relative flex items-center justify-center w-full">
        <Image
          src={profilePicture}
          alt={`${name}'s profile`}
          width={1000}
          height={1000}
          className="rounded-full size-32 object-cover"
        />
        {myProfile && (
          <Button
            size="sm"
            type="button"
            // disabled={disabled}
            variant={"secondary"}
            className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 p-0.5 rounded-full absolute bottom-[-15px] text-xs left-[50%] translate-x-[-50%] "
            onClick={() => setOpenModal(true)}
          >
            <Camera /> Edit
          </Button>
        )}
      </div>
      {openModal && (
        <ResponsiveModal open={openModal}>
          <div>
            <div className="py-4 container bg-white flex items-center justify-center dark:bg-black">
              <Button
                disabled={uploading || pending}
                onClick={() => setOpenModal(false)}
                size="icon"
                variant="ghost"
              >
                <X className="size-6" />
              </Button>
              <h5 className="flex-1 text-center font-semibold text-lg">
                Change picture
              </h5>
            </div>
            <div className="bg-muted py-8">
              <div className="container">
                <Uploader
                  ref={uploaderRef}
                  onChange={(value) => {}}
                  //   value={""}
                  fileTypeAccepted="image"
                  display={true}
                  rounded={true}
                  onPhotoChange={(hasPhoto) => {
                    setShowChange(!!image || hasPhoto);
                    setHasNewPhoto(hasPhoto);
                  }}
                  onUploadSuccess={onSubmit}
                />
              </div>
            </div>
            <footer
              className={cn(
                "container py-4 bg-white dark:bg-dark flex items-center justify-end",
                showChange && "justify-between"
              )}
            >
              {showChange && (
                <Button
                  onClick={() => {
                    uploaderRef.current?.triggerChangePhoto();
                    setShowChange(!!image);
                  }}
                  variant={"ghost"}
                  size="md"
                  disabled={pending || uploading}
                >
                  Change
                </Button>
              )}
              <Button
                size={"md"}
                disabled={pending || uploading}
                onClick={() => {
                  if (!hasNewPhoto) {
                    setOpenModal(false);
                    return;
                  }

                  uploaderRef.current?.uploadPhoto();
                }}
              >
                {pending || uploading ? (
                  <Loader text="Saving..." />
                ) : (
                  "Use this photo"
                )}
              </Button>
            </footer>
          </div>
        </ResponsiveModal>
      )}
    </div>
  );
};
