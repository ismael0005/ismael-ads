"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
    >
      <motion.span
        whileHover={{ rotate: 4, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative h-11 w-[3.92rem] shrink-0"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        />
        <Image
          src="/assets/logos/logo-icon.png"
          alt="Ismael Ads"
          fill
          preload
          sizes="64px"
          className="object-contain"
        />
      </motion.span>
      <span
        style={{ letterSpacing: "0.8px" }}
        className="font-heading text-xl font-black whitespace-nowrap uppercase"
      >
        <span className="text-foreground">Ismael </span>
        <span
          style={{ filter: "drop-shadow(0 0 6px rgba(109,40,217,0.4))" }}
          className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Ads
        </span>
      </span>
    </Link>
  );
}
