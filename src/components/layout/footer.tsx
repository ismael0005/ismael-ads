"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassIcon3D } from "@/components/ui/glass-icon";
import { Logo } from "@/components/common/logo";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { footerLegalLinks, footerQuickLinks, footerSolutionsLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { contactInfo } from "@/data/contact";
import type { FooterLink } from "@/data/navigation";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FOOTER_DESCRIPTION =
  "Helping publishers maximize revenue across Web, Apps and CTV using premium monetization solutions backed by 15+ years of Google AdSense experience.";

const SOCIAL_BUTTONS = [
  { label: "LinkedIn", href: contactInfo.linkedin, icon: LinkedinIcon, external: true, accent: "primary" as const },
  { label: "Email", href: `mailto:${contactInfo.email}`, icon: Mail, external: false, accent: "secondary" as const },
  { label: "WhatsApp", href: contactInfo.whatsappHref, icon: MessageCircle, external: true, accent: "accent" as const },
];

const contactRows = [
  { label: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: Mail, external: false, accent: "secondary" as const },
  { label: contactInfo.whatsappDisplay, href: contactInfo.whatsappHref, icon: MessageCircle, external: true, accent: "accent" as const },
  { label: contactInfo.founder, href: contactInfo.linkedin, icon: LinkedinIcon, external: true, accent: "primary" as const },
];

const PARTICLES = [
  { left: "12%", top: "22%", size: 3, duration: 14 },
  { left: "26%", top: "68%", size: 2, duration: 18 },
  { left: "64%", top: "16%", size: 2, duration: 16 },
  { left: "84%", top: "58%", size: 3, duration: 20 },
  { left: "46%", top: "82%", size: 2, duration: 15 },
  { left: "92%", top: "24%", size: 2, duration: 17 },
];

function FooterColumn({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <span className="relative">
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The cinematic brand centerpiece that replaced the newsletter card — a
 * giant, barely-legible "ISMAEL ADS" wordmark built from three stacked
 * layers (blurred bloom, gradient-fill body with chromatic edge glow,
 * soft glass-reflection highlight) so it reads as illuminated acrylic
 * rather than flat low-opacity text. Purely decorative.
 */
function FooterBrandCenterpiece() {
  const wordmarkSize = "text-[clamp(3.25rem,15vw,10rem)] leading-none font-black whitespace-nowrap font-heading";

  return (
    <div
      aria-hidden="true"
      className="relative my-4 flex h-56 items-center justify-center overflow-hidden select-none sm:h-72 lg:my-8 lg:h-80"
    >
      {/* Large radial light — purple center, blue edges, soft cyan highlight */}
      <motion.div
        animate={{ x: [-18, 18, -18] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_65%_80%_at_50%_50%,rgba(147,51,234,0.13)_0%,rgba(59,130,246,0.09)_45%,rgba(56,189,248,0.07)_68%,transparent_82%)] blur-[80px]",
          "dark:bg-[radial-gradient(ellipse_65%_80%_at_50%_50%,rgba(109,40,217,0.32)_0%,rgba(59,130,246,0.2)_45%,rgba(34,211,238,0.15)_68%,transparent_82%)]"
        )}
      />

      {/* Second beam — blurred, diagonal, extremely slow, almost invisible */}
      <motion.div
        animate={{ x: ["-30%", "30%", "-30%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute inset-y-[-20%] left-1/2 w-[60%] -translate-x-1/2 rotate-[18deg] bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent blur-[60px]",
          "dark:via-accent/[0.08]"
        )}
      />

      <motion.div
        animate={{ x: [-6, 6, -6] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Ambient bloom — the only layer that "breathes"; kept separate from the body's static opacity so Framer's inline style never fights the Tailwind opacity utility below */}
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ letterSpacing: "-2px" }}
          className={cn(wordmarkSize, "absolute inset-0 text-purple-300/25 blur-3xl dark:text-primary/30")}
        >
          ISMAEL ADS
        </motion.span>

        {/* Illuminated body — metallic gradient fill + soft neon purple/cyan edge glow, low opacity by design (should not be readable at a glance) */}
        <span
          style={{ letterSpacing: "-2px" }}
          className={cn(
            wordmarkSize,
            "relative block bg-gradient-to-b from-slate-500/75 via-purple-400/65 to-cyan-400/60 bg-clip-text text-transparent opacity-[0.11]",
            "[filter:drop-shadow(-2px_0_12px_rgba(168,85,247,0.22))_drop-shadow(2px_0_12px_rgba(56,189,248,0.22))]",
            "dark:from-white/75 dark:via-primary/75 dark:to-accent/65 dark:opacity-[0.1]",
            "dark:[filter:drop-shadow(-2px_0_14px_rgba(109,40,217,0.35))_drop-shadow(2px_0_14px_rgba(34,211,238,0.35))]"
          )}
        >
          ISMAEL ADS
        </span>

        {/* Glass reflection / metallic highlight band — a whisper, not a wash */}
        <span
          style={{ letterSpacing: "-2px" }}
          className={cn(
            wordmarkSize,
            "absolute inset-0 bg-gradient-to-b from-white/55 via-white/8 to-transparent bg-clip-text text-transparent opacity-[0.08] mix-blend-overlay dark:opacity-[0.06]"
          )}
        >
          ISMAEL ADS
        </span>
      </motion.div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-black/[0.06] bg-white text-foreground dark:border-white/[0.08] dark:bg-background">
      {/* Layer 1 — deep radial gradients + vignette, theme-adaptive */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-[6%] size-[28rem] rounded-full bg-primary/22 opacity-60 blur-[130px] mix-blend-multiply dark:opacity-90 dark:mix-blend-screen" />
        <div className="absolute top-1/3 right-[10%] size-96 rounded-full bg-secondary/14 opacity-45 blur-[120px] mix-blend-multiply dark:opacity-70 dark:mix-blend-screen" />
        <div className="absolute -bottom-48 right-[8%] size-[28rem] rounded-full bg-accent/16 opacity-55 blur-[130px] mix-blend-multiply dark:opacity-85 dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,transparent_45%,rgba(0,0,0,0.04))] dark:bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,transparent_45%,rgba(0,0,0,0.3))]" />

        {/* Mesh gradient — several soft overlapping color pools; opacity breathes almost imperceptibly, no obvious movement */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute inset-0 opacity-40",
            "bg-[radial-gradient(at_20%_20%,rgba(147,51,234,0.05)_0px,transparent_50%),radial-gradient(at_80%_15%,rgba(56,189,248,0.05)_0px,transparent_50%),radial-gradient(at_30%_85%,rgba(59,130,246,0.05)_0px,transparent_50%),radial-gradient(at_85%_80%,rgba(147,51,234,0.04)_0px,transparent_50%)]",
            "dark:opacity-100 dark:bg-[radial-gradient(at_20%_20%,rgba(147,51,234,0.09)_0px,transparent_50%),radial-gradient(at_80%_15%,rgba(56,189,248,0.08)_0px,transparent_50%),radial-gradient(at_30%_85%,rgba(59,130,246,0.08)_0px,transparent_50%),radial-gradient(at_85%_80%,rgba(147,51,234,0.07)_0px,transparent_50%)]"
          )}
        />
      </div>

      {/* Layer 2 — slow light beam sweep + drifting particles + subtle noise (transform/opacity only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: "-60%" }}
          animate={{ x: "160%" }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70 dark:via-white/[0.06]"
        />
        {PARTICLES.map((particle, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
            className="absolute rounded-full bg-foreground/25 dark:bg-white/30"
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
      </div>

      <Container className="relative z-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8"
        >
          <div>
            <Logo />
            <p className="mt-5 max-w-[20rem] text-sm leading-[1.7] text-muted-foreground">
              {FOOTER_DESCRIPTION}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_BUTTONS.map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="block"
                  >
                    <GlassIcon3D icon={social.icon} accent={social.accent} size="md" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" items={footerQuickLinks} />
          <FooterColumn title="Solutions" items={footerSolutionsLinks} />

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-5 space-y-4">
              {contactRows.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <GlassIcon3D icon={row.icon} accent={row.accent} size="sm" static />
                    <span className="truncate">{row.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            glass.base,
            glass.light,
            "mt-14 flex flex-col items-center gap-5 rounded-3xl p-7 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left"
          )}
        >
          <div>
            <p className="font-heading text-lg font-bold text-foreground sm:text-xl">Ready to see what your traffic is worth?</p>
            <p className="mt-1 text-sm text-muted-foreground">No commitment required to check eligibility.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-11 gap-2 px-6"
                nativeButton={false}
                render={
                  <Link href="/eligibility-checker">
                    Check Eligibility
                    <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
                  </Link>
                }
              />
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6"
                nativeButton={false}
                render={<Link href="/about/contact">Book A Consultation</Link>}
              />
            </MagneticButton>
          </div>
        </motion.div>

        <FooterBrandCenterpiece />

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-black/[0.06] pt-7 text-xs text-muted-foreground/80 sm:flex-row dark:border-white/[0.08]">
          <p className="text-center sm:text-left">
            © {year} {siteConfig.name}.{" "}
            <span className="block text-muted-foreground/60 sm:inline"> Built with passion for publishers.</span>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors duration-200 hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
