"use client";
import { Uploader, UploaderHandle } from "@/components/file-uploader/Uploader";
import { Loader } from "@/components/Loader";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image, X } from "lucide-react";
import React, { useRef, useState } from "react";

export const UploadScreenshotModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const uploading = false;
  const pending = false;
  const uploaderRef = useRef<UploaderHandle>(null);
  let value = "";

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
            <div className="bg-muted py-8">
              <div className="container">
                <Uploader
                  ref={uploaderRef}
                  fileTypeAccepted="image"
                  multiple
                  display={true}
                />
              </div>
            </div>
            <footer
              className={cn(
                "container py-4 bg-white dark:bg-dark flex items-center justify-end",
                "justify-between"
              )}
            >
              <Button size={"md"} disabled={pending || uploading}>
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
