"use client";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";

interface Props {
  screenshots: string[];
}

export const Screenshots = ({ screenshots }: Props) => {
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lightboxSlides = useMemo(
    () =>
      screenshots.map((screenshot: string) => ({
        src: useConstructUrl(screenshot),
      })),
    [screenshots]
  );

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpenLightBox(true);
  };

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {screenshots.map((screenshot, index) => {
          const picture = useConstructUrl(screenshot);
          return (
            <Image
              key={index}
              src={picture}
              alt={`Screenshot`}
              width={1000}
              height={1000}
              className="aspect-video size-full object-cover cursor-pointer"
              onClick={() => handleOpen(index)}
            />
          );
        })}
      </div>
      {openLightBox && (
        <Lightbox
          open={openLightBox}
          close={() => setOpenLightBox(false)}
          slides={lightboxSlides}
          index={currentIndex}
        />
      )}
    </div>
  );
};
