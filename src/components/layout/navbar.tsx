"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { mainNav } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Logo } from "@/components/common/logo";

function isItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const mobileListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

/** The exact floating-pill glass treatment specified for the header — distinct rgba values per theme, not the shared `glass` tokens used elsewhere on the site. */
const FLOATING_GLASS =
  "border border-black/[0.07] bg-[rgba(255,255,255,0.78)] shadow-[0_8px_32px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(12,15,32,0.72)] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65)]";

export function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <Container className="pt-3 sm:pt-4">
        <div className={cn(FLOATING_GLASS, "relative flex h-16 items-center justify-between rounded-full px-3 sm:h-[4.25rem] sm:px-4")}>
          <Logo className="pl-1" onClick={() => setMobileOpen(false)} />

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active = isItemActive(pathname, item.href);
              const open = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredItem(item.label);
                    if (item.children) setOpenDropdown(item.label);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    if (item.children) setOpenDropdown(null);
                  }}
                >
                  <Link
                    href={item.href}
                    aria-expanded={item.children ? open : undefined}
                    onFocus={() => item.children && setOpenDropdown(item.label)}
                    onBlur={() => item.children && setOpenDropdown(null)}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground",
                      active && "font-semibold text-foreground"
                    )}
                  >
                    {hoveredItem === item.label && (
                      <motion.span
                        layoutId="navbar-hover-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-black/[0.05] dark:bg-white/[0.07]"
                      />
                    )}
                    <motion.span whileHover={{ y: -1 }} className="flex items-center gap-1">
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
                          aria-hidden="true"
                        />
                      )}
                    </motion.span>
                    {active && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_8px_1px_rgba(109,40,217,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "top" }}
                        className={cn(
                          glass.base,
                          glass.light,
                          "absolute left-0 top-full mt-3 w-64 rounded-2xl p-2 shadow-2xl shadow-black/10 dark:shadow-black/40"
                        )}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item block rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                          >
                            <div className="font-medium text-foreground transition-colors duration-200 group-hover/item:text-primary-text">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="mt-0.5 text-xs text-muted-foreground">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <MagneticButton strength={0.25} className="relative">
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 rounded-full bg-primary/50 blur-lg"
              />
              <Button
                variant="gradient"
                size="sm"
                nativeButton={false}
                render={<Link href="/eligibility-checker">Check Eligibility</Link>}
              />
            </MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn(FLOATING_GLASS, "mt-2 overflow-hidden rounded-3xl lg:hidden")}
            >
              <motion.nav
                variants={mobileListVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-1 p-3"
              >
                {mainNav.map((item) => (
                  <motion.div key={item.label} variants={mobileItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                        isItemActive(pathname, item.href) && "bg-black/[0.05] dark:bg-white/[0.08]"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-1 mb-1 ml-3.5 flex flex-col gap-1 border-l border-border pl-3.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div variants={mobileItemVariants} className="mt-2">
                  <Button
                    variant="gradient"
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link
                        href="/eligibility-checker"
                        onClick={() => setMobileOpen(false)}
                      >
                        Check Eligibility
                      </Link>
                    }
                  />
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
