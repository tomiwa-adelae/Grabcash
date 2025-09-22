"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { RefreshCw } from "lucide-react";
import { SearchBar } from "@/app/(member)/_components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DashboardHeader = () => {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    router.refresh();

    // Stop spinning after 3s
    setTimeout(() => setSpinning(false), 3000);
  };
  return (
    <header className="bg-background/95 sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex-1 flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center flex-2 lg:flex-1 gap-2 px-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 justify-end flex-1 w-full"
        >
          {/* Search Input - Hide on Mobile */}
          <div className="relative hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              onClick={handleRefresh}
              disabled={spinning}
              className="px-4"
              variant="outline"
              size="md"
            >
              <motion.div
                animate={spinning ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  spinning
                    ? { repeat: Infinity, ease: "linear", duration: 1 }
                    : { duration: 0 }
                }
              >
                <RefreshCw />
              </motion.div>
            </Button>
          </div>
          <ThemeToggle className="h-12 px-6" />
        </motion.div>
      </div>
    </header>
  );
};
