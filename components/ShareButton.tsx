// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState, useRef, useEffect } from "react";
// import { Twitter, Instagram, Linkedin, Link, Share2 } from "lucide-react";
// import { motion } from "motion/react";

// export function ShareButton({
//   className,
//   links,
//   ...props
// }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [buttonDimensions, setButtonDimensions] = useState({
//     width: 0,
//     height: 0,
//   });
//   const buttonRef = useRef<HTMLDivElement>(null);

//   const shareButtons = [
//     { icon: Twitter, label: "Share on Twitter", slug: "https://x.com" },
//     { icon: Instagram, label: "Share on Instagram", slug: "https://x.com" },
//     { icon: Linkedin, label: "Share on LinkedIn", slug: "https://x.com" },
//     { icon: Link, label: "Copy link", slug: "https://x.com" },
//   ];

//   useEffect(() => {
//     if (buttonRef.current) {
//       const { offsetWidth, offsetHeight } = buttonRef.current;
//       setButtonDimensions({ width: offsetWidth, height: offsetHeight });
//     }
//   }, []);

//   const handleShare = (index: number) => {
//     setActiveIndex(index);
//     setTimeout(() => setActiveIndex(null), 300);
//   };

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsVisible(true)}
//       onMouseLeave={() => setIsVisible(false)}
//     >
//       <motion.div
//         ref={buttonRef}
//         animate={{
//           opacity: isVisible ? 0 : 1,
//         }}
//         transition={{
//           duration: 0.2,
//           ease: "easeInOut",
//         }}
//       >
//         <Button className="rounded-full" size="md" {...props}>
//           <span className="flex items-center gap-2">
//             <Share2 className="w-4 h-4" />
//             Share profile
//           </span>
//         </Button>
//       </motion.div>

//       <motion.div
//         className="absolute top-0 -left-5 flex overflow-hidden"
//         style={{
//           height: buttonDimensions.height,
//         }}
//         animate={{
//           width: isVisible ? "auto" : 0,
//         }}
//         transition={{
//           duration: 0.3,
//           ease: [0.23, 1, 0.32, 1],
//         }}
//       >
//         {shareButtons.map((button, i) => (
//           <motion.button
//             type="button"
//             key={`share-${button.label}`}
//             aria-label={button.label}
//             onClick={() => handleShare(i)}
//             className={cn(
//               "flex items-center justify-center",
//               "bg-muted dark:bg-white",
//               "text-black dark:text-white",
//               i === 0 && "rounded-l-full",
//               i === 3 && "rounded-r-full",
//               "border-r border-white/10 dark:border-black/10 last:border-r-0",
//               "hover:bg-primary hover:text-white cursor-pointer",
//               "outline-none",
//               "relative overflow-hidden",
//               "transition-colors duration-200"
//             )}
//             style={{
//               width: buttonDimensions.height, // Square buttons using height as width
//               height: buttonDimensions.height,
//             }}
//             animate={{
//               opacity: isVisible ? 1 : 0,
//               x: isVisible ? 0 : -20,
//             }}
//             transition={{
//               duration: 0.3,
//               ease: [0.23, 1, 0.32, 1],
//               delay: isVisible ? i * 0.05 : 0,
//             }}
//           >
//             <motion.div
//               className="relative z-10"
//               animate={{
//                 scale: activeIndex === i ? 0.85 : 1,
//               }}
//               transition={{
//                 duration: 0.2,
//                 ease: "easeInOut",
//               }}
//             >
//               <button.icon className="w-4 h-4" />
//             </motion.div>
//             <motion.div
//               className="absolute inset-0 bg-white dark:bg-black"
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: activeIndex === i ? 0.15 : 0,
//               }}
//               transition={{
//                 duration: 0.2,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.button>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Share2,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";

type SocialLink = {
  id: string;
  url: string;
};

export function ShareButton({
  className,
  links = [],
  ...props
}: { links: SocialLink[] } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
  });
  const buttonRef = useRef<HTMLDivElement>(null);

  // map domains to icons
  const getIconForUrl = (url: string) => {
    if (url.includes("x.com") || url.includes("twitter.com")) return Twitter;
    if (url.includes("instagram.com")) return Instagram;
    if (url.includes("linkedin.com")) return Linkedin;
    if (url.includes("youtube.com")) return Youtube;
    return LinkIcon; // fallback
  };

  // Build share buttons dynamically from links prop
  const shareButtons = links.map((link) => ({
    icon: getIconForUrl(link.url),
    label: `Open ${link.url}`,
    slug: link.url,
  }));

  useEffect(() => {
    if (buttonRef.current) {
      const { offsetWidth, offsetHeight } = buttonRef.current;
      setButtonDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleShare = (url: string, index: number) => {
    setActiveIndex(index);
    window.open(url, "_blank"); // open link
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        ref={buttonRef}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Button className="rounded-full" size="md" {...props}>
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share profile
          </span>
        </Button>
      </motion.div>

      <motion.div
        className="absolute top-0 -left-5 flex overflow-hidden"
        style={{ height: buttonDimensions.height }}
        animate={{ width: isVisible ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            type="button"
            key={`share-${i}`}
            aria-label={button.label}
            onClick={() => handleShare(button.slug, i)}
            className={cn(
              "flex items-center justify-center",
              "bg-muted dark:bg-white",
              "text-black dark:text-white",
              i === 0 && "rounded-l-full",
              i === shareButtons.length - 1 && "rounded-r-full",
              "border-r border-white/10 dark:border-black/10 last:border-r-0",
              "hover:bg-primary hover:text-white cursor-pointer",
              "outline-none relative overflow-hidden transition-colors duration-200"
            )}
            style={{
              width: buttonDimensions.height,
              height: buttonDimensions.height,
            }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <motion.div
              className="relative z-10"
              animate={{ scale: activeIndex === i ? 0.85 : 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <button.icon className="w-4 h-4" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-white dark:bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === i ? 0.15 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
