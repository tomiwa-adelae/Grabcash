"use client";
import { Uploader, UploaderHandle } from "@/components/file-uploader/Uploader";
import { Loader } from "@/components/Loader";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/use-try-catch";
import { cn } from "@/lib/utils";
import { Image, X } from "lucide-react";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveApplicantScreenshot } from "../actions";
import { useConfetti } from "@/hooks/use-confetti";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  slug: string;
}

export const UploadScreenshotModal = ({ id, slug }: Props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const uploaderRef = useRef<UploaderHandle>(null);
  const { triggerConfetti } = useConfetti();

  const [uploading, setUploading] = useState<boolean>(false);

  const [pending, startTransition] = useTransition();

  const handleUpload = (uploadedImageKey: string | string[]) => {
    const imageKey = Array.isArray(uploadedImageKey)
      ? uploadedImageKey
      : [uploadedImageKey];

    if (!imageKey) {
      toast.error("No picture to save");
      return;
    }
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        saveApplicantScreenshot(id, imageKey)
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setOpenModal(false);
        triggerConfetti();
        router.push(`/available-jobs/${slug}/success?id=${result.id}`);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} size="md" variant={"outline"}>
        <Image />
        Upload screenshots
      </Button>
      {openModal && (
        <ResponsiveModal open={openModal}>
          <div>
            <div className="py-4 container bg-white flex items-center justify-center dark:bg-black">
              <Button
                disabled={pending}
                onClick={() => setOpenModal(false)}
                size="icon"
                variant="ghost"
              >
                <X className="size-6" />
              </Button>
              <h5 className="flex-1 text-center font-semibold text-lg">
                Upload screenshots
              </h5>
            </div>
            <div className="bg-muted py-8">
              <div className="container">
                <Uploader
                  ref={uploaderRef}
                  fileTypeAccepted="image"
                  multiple
                  display={true}
                  onUploadSuccess={handleUpload}
                />
              </div>
            </div>
            <footer
              className={cn(
                "container py-4 bg-white dark:bg-dark flex items-center justify-end",
                "justify-between"
              )}
            >
              <Button
                size={"md"}
                variant={"ghost"}
                onClick={() => setOpenModal(false)}
                disabled={pending || uploading}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  uploaderRef.current?.uploadPhoto();
                }}
                size={"md"}
                disabled={pending || uploading}
              >
                {pending || uploading ? (
                  <Loader text="Submitting..." />
                ) : (
                  "Submit"
                )}
              </Button>
            </footer>
          </div>
        </ResponsiveModal>
      )}
    </div>
  );
};
