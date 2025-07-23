"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogOut, Menu, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/Logo";
import { rootNavLinks } from "@/constants";

export function MobileNavbar({ user }: { user: any }) {
	const [openMobile, setOpenMobile] = useState(false); // <-- add state
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		router.push("/sign-in"); // Redirect to sign-in page after logout
	};

	const handleClick = () => {
		if (setOpenMobile) {
			setOpenMobile(false);
		}
	};

	const isActive = (slug: string) =>
		pathname === slug || pathname.startsWith(`${slug}/`);

	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile}>
			<SheetTrigger asChild>
				<Button variant="ghost" size={"icon"}>
					<Menu className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent className="h-screen py-4" side={"left"}>
				<ScrollArea className="h-screen">
					<div className="container pb-20">
						<div className="flex flex-1 flex-col overflow-x-hidden">
							<SheetClose asChild>
								<Logo />
							</SheetClose>
							<div className="mt-8 flex flex-col gap-1">
								<Link
									href={"/"}
									className={`group flex items-center justify-start gap-2 group/sidebar                             ${
										isActive("/") && "bg-secondary"
									} hover:bg-secondary p-4 rounded-lg
                            `}
									onClick={handleClick}
								>
									<span className="text-sm font-medium">
										Home
									</span>
								</Link>
								{rootNavLinks.map(({ label, slug }, idx) => (
									<Link
										key={idx}
										href={slug}
										className={`group flex items-center justify-start gap-2 group/sidebar
                            ${
								isActive(slug) && "bg-secondary"
							} hover:bg-secondary p-4 rounded-lg
                            `}
										onClick={handleClick}
									>
										<span className="text-sm font-medium">
											{label}
										</span>
									</Link>
								))}
							</div>
							<div className="flex flex-col mt-4 w-full items-center justify-end gap-2">
								<SheetClose asChild>
									<Button
										asChild
										size="md"
										className="w-full"
									>
										<Link href="/register">
											Get started
										</Link>
									</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button
										asChild
										size="md"
										variant={"ghost"}
										className="w-full"
									>
										<Link href="/login">Login</Link>
									</Button>
								</SheetClose>
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
