"use client";
import { useConfetti } from "@/hooks/use-confetti";
import React, { useEffect } from "react";

export const Confetti = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);
  return null;
};
