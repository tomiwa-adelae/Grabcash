"use client";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";
import { ResponsiveModal } from "./ResponsiveModal";
import { Uploader, UploaderHandle } from "./file-uploader/Uploader";
import { tryCatch } from "@/hooks/use-try-catch";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";
import { saveProfilePicture } from "@/app/(onboarding)/onboarding/actions";

export const UploadProfilePicture = ({
  onChange,
  value,
  disabled = false,
}: {
  onChange: (value: any) => void;
  value?: string;
  disabled?: boolean;
}) => {
  const uploaderRef = useRef<UploaderHandle>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showChange, setShowChange] = useState<boolean>(!!value);
  const [hasNewPhoto, setHasNewPhoto] = useState<boolean>(false);

  const [pending, startTransition] = useTransition();

  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const status = uploaderRef.current?.isUploading?.();
      if (status !== undefined) {
        setUploading(status);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (openModal) {
      const shouldShow = !!value && !value.startsWith("/assets/");
      setShowChange(shouldShow);
      setHasNewPhoto(false);
    }
  }, [value, openModal]);

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
        onChange(imageKey);
        setOpenModal(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  // Fixed image URL logic - useConstructUrl won't be called for https URLs
  const profilePicture = useConstructUrl(value);

  return (
    <div>
      <div className="relative flex items-center justify-center w-full">
        <Image
          src={profilePicture}
          alt="User profile picture"
          width={1000}
          height={1000}
          className="rounded-full object-cover size-[250px]"
        />
        <Button
          size="sm"
          type="button"
          disabled={disabled}
          variant={"secondary"}
          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 absolute bottom-[-15px] left-[50%] translate-x-[-50%] "
          onClick={() => setOpenModal(true)}
        >
          <Camera /> Edit
        </Button>
      </div>
      {openModal && (
        <ResponsiveModal open={openModal}>
          <div className="overflow-hidden flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] [&>button:last-child]:top-3.5">
            <div className="py-4 container flex items-center justify-center">
              <Button
                disabled={uploading || pending}
                onClick={() => setOpenModal(false)}
                size="icon"
                variant="ghost"
              >
                <X className="size-6" />
              </Button>
              <h5 className="flex-1 text-center font-semibold text-lg">
                Upload profile picture
              </h5>
            </div>
            <div className="bg-muted py-8 overflow-y-auto max-h-96">
              <div className="container">
                <Uploader
                  ref={uploaderRef}
                  onChange={(value) => {}}
                  value={value?.startsWith("/assets") ? "" : value}
                  fileTypeAccepted="image"
                  display={true}
                  rounded={true}
                  onPhotoChange={(hasPhoto) => {
                    setShowChange(!!value || hasPhoto);
                    setHasNewPhoto(hasPhoto);
                  }}
                  onUploadSuccess={onSubmit}
                />
              </div>
            </div>
            <footer className={cn("py-4")}>
              <div className="container flex items-center justify-end">
                {showChange && (
                  <Button
                    onClick={() => {
                      uploaderRef.current?.triggerChangePhoto();
                      setShowChange(!!value);
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
              </div>
            </footer>
          </div>
        </ResponsiveModal>
      )}
    </div>
  );
};
