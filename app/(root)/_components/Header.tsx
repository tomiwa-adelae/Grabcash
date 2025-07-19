import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { rootNavLinks } from "@/constants";
import Link from "next/link";
import React from "react";

export const Header = () => {
	return (
		<header className="fixed top-0 w-full bg-white dark:bg-black min-h-20 py-4 flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
			<div className="container flex items-center justify-between gap-4">
				<Logo />
				<div className="flex-1 flex font-medium items-center justify-center gap-8">
					{rootNavLinks.map(({ slug, label }) => (
						<Link
							className="text-sm hover:text-primary transition-all"
							key={slug}
							href={slug}
						>
							{label}
						</Link>
					))}
				</div>
				<div className="flex items-center justify-end gap-4">
					<Button size="md" asChild variant={"ghost"}>
						<Link href="/login">Login</Link>
					</Button>
					<Button size="md" asChild>
						<Link href="/register">Get started</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};
