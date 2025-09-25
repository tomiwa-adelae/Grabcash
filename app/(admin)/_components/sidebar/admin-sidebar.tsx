"use client";

import { memo } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Activity,
  Database,
  Shield,
  Zap,
  Bell,
  Settings,
  Moon,
  Sun,
  User,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { adminNavLinks } from "@/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { title: "Analytics", icon: BarChart3, href: "#analytics" },
  { title: "Users", icon: Users, href: "#users" },
  { title: "Content", icon: FileText, href: "#content" },
  { title: "Activity", icon: Activity, href: "#activity" },
  { title: "Database", icon: Database, href: "#database" },
  { title: "Security", icon: Shield, href: "#security" },
  { title: "Performance", icon: Zap, href: "#performance" },
  { title: "Notifications", icon: Bell, href: "#notifications" },
  { title: "Settings", icon: Settings, href: "#settings" },
];

export const AdminSidebar = memo(() => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch={false} href="/admin/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Logo size="text-xl" />
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavLinks.map((item, index) => {
                const Icon = item.icon;
                return item.group ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    className="group/collapsible"
                    defaultOpen={
                      // open the first group by default
                      adminNavLinks.findIndex((i) => i.group) === index
                    }
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <Button
                          size="md"
                          variant={"ghost"}
                          className={cn(
                            "w-full dark:bg-accent/50 dark:hover:bg-accent text-left justify-start",
                            pathname.startsWith(item.slug!) && "bg-secondary"
                          )}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Button
                                variant={"ghost"}
                                className={cn(
                                  "w-full dark:bg-accent/50 dark:hover:bg-accent text-left justify-start",
                                  pathname.startsWith(subItem.slug) &&
                                    "bg-secondary"
                                )}
                                asChild
                              >
                                <Link href={subItem.slug}>
                                  {subItem.icon && <subItem.icon />}
                                  <span>{subItem.title}</span>
                                </Link>
                              </Button>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <Button
                      variant={"ghost"}
                      size="md"
                      className={cn(
                        "w-full dark:bg-accent/50 dark:hover:bg-accent text-left justify-start",
                        pathname.startsWith(item.slug!) && "bg-secondary"
                      )}
                      asChild
                    >
                      <Link href={item.slug!}>
                        {item.icon! && <Icon />}
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link prefetch={false} href="#profile">
                <User />
                <span>Admin Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});

AdminSidebar.displayName = "AdminSidebar";
