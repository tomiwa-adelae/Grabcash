"use client";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import Link from "next/link";
import React, { useEffect } from "react";

export const SuccessButton = () => {
	const { triggerConfetti } = useConfetti();

	useEffect(() => {
		triggerConfetti();
	}, []);

	return (
		<div className="mt-8 max-w-2xl mx-auto">
			<Button className="w-full" size="md" asChild>
				<Link href="/dashboard">Proceed to dashboard</Link>
			</Button>
		</div>
	);
};
