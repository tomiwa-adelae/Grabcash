import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground ",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="mt-4 text-sm md:text-base font-medium text-muted-foreground">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          click to upload
        </span>
      </p>
      <Button size="md" type="button" className="mt-4">
        Select file
      </Button>
    </div>
  );
};

const RenderErrorState = ({ retryUpload }: { retryUpload: () => void }) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/20">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="mt-4 text-base font-semibold">Upload failed</p>
      <p className="text-xs text-muted-foreground mt-1">Something went wrong</p>
      <Button
        onClick={() => retryUpload()}
        type="button"
        size="md"
        className="mt-4"
      >
        Retry upload
      </Button>
    </div>
  );
};

const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoval,
  fileType,
}: {
  fileType: "image" | "video";
  previewUrl: string;
  isDeleting: boolean;
  handleRemoval: () => void;
}) => {
  return (
    <div className="relative size-full flex items-center overflow-hidden justify-center group">
      {fileType === "video" ? (
        <video src={previewUrl} controls className="rounded-md size-full" />
      ) : (
        <div className="overflow-hidden rounded-full">
          <Image
            src={previewUrl}
            alt="Uploaded file"
            width={1000}
            height={1000}
            className="size-full"
          />
        </div>
      )}
      <Button
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
        onClick={handleRemoval}
        disabled={isDeleting}
        type="button"
      >
        {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  );
};

const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="text-center flex items-center justify-center flex-col">
      <p>{progress}%</p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        Uploading...
      </p>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-1 max-w-xs">
        {file.name}
      </p>
    </div>
  );
};

export {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
};
