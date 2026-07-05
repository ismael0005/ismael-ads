"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PhoneFrame } from "@/components/sections/app-monetization/phone-frame";
import { WhatsappScreen } from "@/components/sections/contact/whatsapp-screen";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { contactFinalCta, contactInfo } from "@/data/contact";

const FOUNDER_FILTER = [
  "drop-shadow(0 0 30px rgba(109,40,217,0.35))",
  "drop-shadow(0 0 60px rgba(34,211,238,0.16))",
  "drop-shadow(-5px -6px 12px rgba(34,211,238,0.2))",
  "drop-shadow(6px 10px 18px rgba(0,0,0,0.3))",
].join(" ");

const FOUNDER_BOTTOM_FADE = "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)";

const FOUNDER_GLOW_TIGHT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(37,99,235,0.32) 32%, rgba(34,211,238,0.2) 55%, transparent 75%)",
};
const FOUNDER_GLOW_AMBIENT: CSSProperties = {
  background: "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
};

export function ContactFinalCtaSection() {
  const character = characterAssets[contactFinalCta.characterPose];
  const [headlineLead, headlineTail] = contactFinalCta.headline.split(contactFinalCta.headlineEmphasis);

  return (
    <Section spacing="xl" className="relative isolate overflow-hidden">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center pb-[22rem] text-center sm:pb-[27rem]">
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div variants={motionVariants.fadeInUp}>
            <Heading as="h2" size="2xl" className="text-balance">
              {headlineLead}
              <GradientText>{contactFinalCta.headlineEmphasis}</GradientText>
              {headlineTail}
            </Heading>
          </motion.div>

          <motion.p variants={motionVariants.fadeInUp} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {contactFinalCta.subheadline}
          </motion.p>

          <motion.div variants={motionVariants.fadeInUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Button
                variant="gradient"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {contactFinalCta.whatsappLabel}
                  </Link>
                }
              />
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={`mailto:${contactInfo.email}`}>
                    <Mail className="size-4" aria-hidden="true" />
                    {contactFinalCta.emailLabel}
                  </Link>
                }
              />
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8 text-base"
                nativeButton={false}
                render={
                  <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="size-4" aria-hidden="true" />
                    {contactFinalCta.linkedinLabel}
                  </Link>
                }
              />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Founder blended into the background beside a giant phone — continuous background, no divider from the previous section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[150px] mix-blend-multiply dark:mix-blend-screen"
        />

        <div className="relative flex items-end gap-4 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-40 shrink-0 sm:w-64"
          >
            <div aria-hidden="true" style={FOUNDER_GLOW_AMBIENT} className="absolute -inset-[90%] -z-20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" style={FOUNDER_GLOW_TIGHT} className="absolute -inset-[45%] -z-10 rounded-full blur-[55px] mix-blend-multiply dark:mix-blend-screen" />
            <div aria-hidden="true" className="absolute inset-x-[22%] bottom-0 h-[8%] rounded-full bg-black/20 blur-2xl dark:bg-black/35" />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full">
              <div className="absolute inset-0 bg-transparent" style={{ maskImage: FOUNDER_BOTTOM_FADE, WebkitMaskImage: FOUNDER_BOTTOM_FADE }}>
                <Image
                  src={character.src}
                  alt={character.alt}
                  fill
                  sizes="16rem"
                  className="object-contain"
                  style={{ filter: FOUNDER_FILTER }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 w-32 sm:mb-10 sm:w-44"
          >
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <PhoneFrame className="shadow-2xl ring-1 ring-white/10">
                <WhatsappScreen />
              </PhoneFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
