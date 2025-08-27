"use client";
import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// 👇 Type to expose triggerFileInput
export type UploaderHandle = {
  triggerFileInput: () => void;
  uploadPhoto: () => void;
  triggerChangePhoto: () => void;
  uploadAllFiles: () => void;
  isUploading: () => boolean;
};

interface iAppProps {
  value?: string;
  multiple?: boolean;
  display?: boolean;
  onPhotoChange?: (value: boolean) => void;
  rounded?: boolean;
  // onChange?: (value: string) => void;
  onChange?: (value: string | string[]) => void;
  fileTypeAccepted: "image" | "video";
  onUploadSuccess?: (value: string | string[]) => void; // ✅ New prop
}

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  photo?: string;
  fileType: "image" | "video";
}

export const Uploader = forwardRef<UploaderHandle, iAppProps>(
  (
    {
      onChange,
      value,
      fileTypeAccepted,
      multiple = false,
      display = false,
      rounded = false,
      onPhotoChange,
      onUploadSuccess,
    }: iAppProps,
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const filesRef = useRef<File[]>([]);

    const profilePictureUrl = useConstructUrl(
      value && !value.startsWith("https") ? value : ""
    );
    const [photo, setPhoto] = useState<string>(
      value?.startsWith("/assets/")
        ? value
        : value?.startsWith("https")
          ? value // Use the https URL directly
          : profilePictureUrl || ""
    );
    const [photos, setPhotos] = useState<string[]>([]);
    const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);

    // ✅ Manual fallback input handler
    const handleManualSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      setUploadedKeys([]);
      if (!files) return;

      const newPhotos: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newPhotos.push(reader.result as string);
          setPhotos((prev) => [...prev, ...newPhotos]);
        };
        reader.readAsDataURL(file);
      });

      // Reset input to allow reselecting same file
      event.target.value = "";
    };

    const uploadFile = useCallback(
      async (file: File): Promise<string> => {
        setFileState((prev) => ({
          ...prev,
          uploading: true,
          progress: 0,
        }));

        try {
          const presignedResponse = await fetch("/api/s3/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type,
              size: file.size,
              isImage: fileTypeAccepted === "image" ? true : false,
            }),
          });

          if (!presignedResponse.ok) {
            toast.error("Failed to get presigned URL");
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 0,
              error: true,
            }));
            throw new Error("Failed to get presigned URL");
          }

          const { presignedUrl, key } = await presignedResponse.json();

          return new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const percentageCompleted = (event.loaded / event.total) * 100;

                setFileState((prev) => ({
                  ...prev,
                  progress: Math.round(percentageCompleted),
                }));
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200 || xhr.status === 204) {
                setFileState((prev) => ({
                  ...prev,
                  progress: 100,
                  uploading: false,
                  key,
                }));
                toast.success("File uploaded successfully");
                onChange?.(key);
                resolve(key); // ✅ return key
              } else {
                reject(new Error("Upload failed..."));
              }
            };
            xhr.onerror = () => {
              reject(new Error("Upload failed..."));
            };

            xhr.open("PUT", presignedUrl);
            xhr.setRequestHeader("Content-Type", file.type);
            xhr.send(file);
          });
        } catch (error) {
          toast.error("Something went wrong");
          setFileState((prev) => ({
            ...prev,
            progress: 0,
            error: true,
            uploading: false,
          }));
          throw error;
        }
      },
      [fileTypeAccepted, onChange]
    );

    // ✅ Expose to parent
    useImperativeHandle(ref, () => ({
      triggerChangePhoto: () => {
        setPhoto("");
        onPhotoChange?.(false);
        // ✅ Reset fileState to make dropzone clickable again
        setFileState({
          error: false,
          file: null,
          id: null,
          uploading: false,
          progress: 0,
          isDeleting: false,
          fileType: fileTypeAccepted,
          objectUrl: undefined, // ✅ Clear objectUrl to enable dropzone
        });
      },
      triggerFileInput: () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      },
      uploadAllFiles: async () => {
        const allFiles = filesRef.current;

        if (allFiles.length === 0) return;

        const newUploadedKeys: string[] = [];

        for (const file of allFiles) {
          setFileState({
            file,
            uploading: true,
            progress: 0,
            objectUrl: URL.createObjectURL(file),
            error: false,
            id: uuidv4(),
            isDeleting: false,
            fileType: fileTypeAccepted,
          });

          try {
            const key = await uploadFile(file); // ✅ wait for each file and get key
            newUploadedKeys.push(key);
          } catch (error) {
            console.error("Failed to upload file:", error);
          }
        }

        // ✅ Notify parent that uploads are done with actual keys
        setUploadedKeys(newUploadedKeys);
        onChange?.(newUploadedKeys);
        onUploadSuccess?.(newUploadedKeys);
      },
      uploadPhoto: async () => {
        const files = filesRef.current;

        if (!files || files.length === 0) {
          toast.error("No file selected");
          return;
        }

        const file = files[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: true, // ✅ Set uploading to true immediately
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: fileTypeAccepted,
        });

        try {
          const uploadedKey = await uploadFile(file);
          // ✅ Call onUploadSuccess with the actual uploaded key
          onUploadSuccess?.(uploadedKey);
        } catch (error) {
          console.error("Failed to upload photo:", error);
        }
      },

      isUploading: () => fileState.uploading, // ✅ expose here
    }));

    const fileUrl = useConstructUrl(value || "");
    const [fileState, setFileState] = useState<UploaderState>({
      error: false,
      file: null,
      id: null,
      uploading: false,
      progress: 0,
      isDeleting: false,
      fileType: fileTypeAccepted,
      key: value,
      objectUrl: value ? fileUrl : undefined,
    });

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        filesRef.current = acceptedFiles;

        setUploadedKeys([]); // reset previous uploads
        if (!multiple && !display && acceptedFiles.length > 0) {
          const file = acceptedFiles[0];

          if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
            URL.revokeObjectURL(fileState.objectUrl);
          }

          setFileState({
            file: file,
            uploading: false,
            progress: 0,
            objectUrl: URL.createObjectURL(file),
            error: false,
            id: uuidv4(),
            isDeleting: false,
            fileType: fileTypeAccepted,
          });

          uploadFile(file);
        } else if (multiple && acceptedFiles.length > 0) {
          acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const previewImage = reader.result as string;
              setPhotos((prev) => [...prev, previewImage]);
            };
          });
        } else if (display) {
          const file = acceptedFiles[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const previewImage = reader.result as string;
            setPhoto(previewImage);
            onPhotoChange?.(true);
          };
        }
      },
      [fileState.objectUrl, uploadFile, fileTypeAccepted]
    );

    async function handleRemoveFile() {
      if (fileState.isDeleting || !fileState.objectUrl) return;

      try {
        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
        }));

        const response = await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: fileState.key }),
        });

        if (!response.ok) {
          toast.error("Failed to remove file from storage");
          setFileState((prev) => ({
            ...prev,
            isDeleting: true,
            error: true,
          }));

          return;
        }

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        onChange?.("");

        setFileState(() => ({
          file: null,
          uploading: false,
          progress: 0,
          objectUrl: undefined,
          error: false,
          fileType: fileTypeAccepted,
          id: null,
          isDeleting: false,
        }));

        toast.success("File removed successfully");
      } catch (error) {
        toast.error("Error removing file. Please try again later");

        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
      }
    }

    const rejectedFiles = (fileRejection: FileRejection[]) => {
      if (fileRejection.length) {
        const tooManyFiles = fileRejection.find(
          (rejection) => rejection.errors[0].code === "too-many-files"
        );

        const fileSizeTooBig = fileRejection.find(
          (rejection) => rejection.errors[0].code === "file-too-large"
        );

        if (tooManyFiles) {
          toast.error("Too many files selected, max is 10");
        }

        if (fileSizeTooBig) {
          toast.error("File size exists the limit");
        }
      }
    };

    const renderContent = () => {
      if (fileState.uploading) {
        return (
          <RenderUploadingState
            progress={fileState.progress}
            file={fileState.file as File}
          />
        );
      }
      if (fileState.error) {
        return (
          <RenderErrorState
            retryUpload={() => {
              setFileState({
                error: false,
                file: null,
                id: null,
                uploading: false,
                progress: 0,
                isDeleting: false,
                fileType: fileTypeAccepted,
                key: value,
                objectUrl: value ? fileUrl : undefined,
              });
            }}
          />
        );
      }

      if (fileState.objectUrl && !display) {
        return (
          <RenderUploadedState
            previewUrl={fileState.objectUrl}
            isDeleting={fileState.isDeleting}
            handleRemoval={handleRemoveFile}
            fileType={fileState.fileType}
          />
        );
      }

      return <RenderEmptyState isDragActive={isDragActive} />;
    };

    useEffect(() => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept:
        fileTypeAccepted === "video" ? { "video/*": [] } : { "image/*": [] },
      maxFiles: multiple ? 10 : 1,
      multiple,
      maxSize:
        fileTypeAccepted === "image" ? 5 * 1024 * 1024 : 5000 * 1024 * 1024,
      onDropRejected: rejectedFiles,
      disabled: fileState.uploading || !!fileState.objectUrl,
    });

    return (
      <>
        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={fileTypeAccepted === "image" ? "image/*" : "video/*"}
          multiple={multiple}
          onChange={handleManualSelect}
        />

        {/* Show uploading state if uploading is true */}
        {fileState.uploading ? (
          <Card className="relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64 border-primary bg-primary/10">
            <CardContent className="items-center flex justify-center size-full">
              <RenderUploadingState
                progress={fileState.progress}
                file={fileState.file as File}
              />
            </CardContent>
          </Card>
        ) : !photo && photos.length === 0 ? (
          <Card
            className={cn(
              "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
              isDragActive
                ? "border-primary bg-primary/10 border-solid"
                : "border-border hover:border-primary"
            )}
            {...getRootProps()}
          >
            <CardContent className="items-center flex justify-center size-full">
              <input ref={inputRef} multiple {...getInputProps()} />
              {renderContent()}
            </CardContent>
          </Card>
        ) : (
          <ScrollArea>
            <div className="grid grid-cols-2 gap-4 overflow-hidden">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="border relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo}
                    alt={"Photo uploaded"}
                    width={1000}
                    height={1000}
                    className="aspect-square col-span-1 object-cover size-full"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const updatedPhotos = photos.filter(
                        (_, i) => i !== index
                      );
                      setPhotos(updatedPhotos);
                    }}
                    className="absolute rounded-full top-2 right-2"
                    variant="outline"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {!fileState.uploading && photo && (
          <div className="flex items-center justify-center">
            <Image
              src={photo}
              alt="Photo uploaded"
              width={1000}
              height={1000}
              className="rounded-full size-[250px] object-cover"
            />
          </div>
        )}
      </>
    );
  }
);
