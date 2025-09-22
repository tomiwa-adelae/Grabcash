import React, { ReactNode } from "react";
import { PageGradient } from "@/components/PageGradient";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/app/(admin)/_components/sidebar/admin-sidebar";
import { DashboardHeader } from "@/app/(admin)/_components/sidebar/dashboard-header";
import { requireAdmin } from "../data/admin/require-admin";

const layout = async ({ children }: { children: ReactNode }) => {
  await requireAdmin();
  return (
    <SidebarProvider className="relative">
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader />

        <div className="flex flex-1 flex-col gap-2 p-2 pt-0 sm:gap-4 sm:p-4">
          <div className="min-h-[calc(100vh-4rem)] flex-1 rounded-lg px-3 py-4 sm:rounded-xl sm:p-4 md:p-6">
            <PageGradient />
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
