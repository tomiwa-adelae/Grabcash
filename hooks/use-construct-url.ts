import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { env } from "@/lib/env";

export const useConstructUrl = (image: string | null | undefined) => {
  if (!image) return DEFAULT_PROFILE_PICTURE;

  if (image.startsWith("https://")) {
    // Google or external provider
    return image;
  }

  if (image.startsWith("/assets")) {
    // Google or external provider
    return image;
  }

  // Uploaded file → build full URL
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${image}`;
};
