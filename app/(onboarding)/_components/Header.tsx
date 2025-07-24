import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { rootNavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
	return (
		<header className="fixed top-0 w-full bg-white dark:bg-black min-h-20 py-4 flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
			<div className="container flex items-center justify-between gap-4">
				<Logo />
				<div className="hidden flex-1 md:flex font-medium items-center justify-center gap-8">
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
				<div className="hidden md:flex items-center justify-end gap-4">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
