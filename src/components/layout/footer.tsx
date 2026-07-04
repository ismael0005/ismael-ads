"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/common/logo";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerLegalLinks, footerQuickLinks, footerSolutionsLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { contactInfo } from "@/data/contact";
import type { FooterLink } from "@/data/navigation";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FOOTER_DESCRIPTION =
  "Helping publishers maximize revenue across Web, Apps and CTV using premium monetization solutions backed by 15+ years of Google AdSense experience.";

const TRUST_BADGES = ["15+ Years", "Google AdSense Expert", "LATAM", "North America", "Europe"];

const SOCIAL_BUTTONS = [
  { label: "LinkedIn", href: contactInfo.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${contactInfo.email}`, icon: Mail, external: false },
  { label: "WhatsApp", href: contactInfo.whatsappHref, icon: MessageCircle, external: true },
];

const contactRows = [
  { label: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: Mail, external: false },
  { label: contactInfo.whatsappDisplay, href: contactInfo.whatsappHref, icon: MessageCircle, external: true },
  { label: contactInfo.founder, href: contactInfo.linkedin, icon: LinkedinIcon, external: true },
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
      </div>

      {/* Layer 2 — huge, near-invisible background wordmark for depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-heading text-[clamp(3rem,16vw,12rem)] leading-none font-black tracking-tight whitespace-nowrap text-foreground opacity-[0.05] blur-[1px] dark:opacity-[0.04]">
          ISMAEL ADS
        </span>
      </div>

      {/* Layer 3 — slow light beam sweep + drifting particles + subtle noise (transform/opacity only) */}
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {FOOTER_DESCRIPTION}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    glass.base,
                    glass.light,
                    "rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_BUTTONS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="group rounded-2xl bg-gradient-to-br from-primary/60 via-secondary/50 to-accent/60 p-[1.5px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:rotate-3 hover:shadow-[0_8px_20px_-4px_rgba(109,40,217,0.45)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white/95 text-muted-foreground backdrop-blur-xl transition-colors duration-300 group-hover:text-primary-text dark:bg-[#0c0f20]/90">
                    <social.icon className="size-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" items={footerQuickLinks} />
          <FooterColumn title="Solutions" items={footerSolutionsLinks} />

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-5 space-y-3">
              {contactRows.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    <span
                      className={cn(
                        glass.base,
                        glass.light,
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 group-hover:border-primary/40 group-hover:text-primary-text group-hover:shadow-md group-hover:shadow-primary/20"
                      )}
                    >
                      <row.icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="truncate">{row.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            glass.base,
            glass.light,
            "relative mt-16 overflow-hidden rounded-[2rem] p-8 text-center sm:p-12"
          )}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]"
          />
          <h3 className="font-heading text-2xl font-bold text-balance text-foreground sm:text-3xl">
            Publisher Insights
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Get the latest publisher monetization tips, Google updates, and revenue optimization strategies directly in your inbox.
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <NewsletterForm />
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] pt-8 text-sm text-muted-foreground sm:flex-row dark:border-white/[0.08]">
          <p className="text-center sm:text-left">
            © {year} {siteConfig.name}.{" "}
            <span className="block text-muted-foreground/70 sm:inline"> Built with passion for publishers.</span>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
