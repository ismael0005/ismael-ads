"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { GradientText } from "@/components/ui/gradient-text";
import { motionVariants } from "@/styles/animations";
import { characterAssets } from "@/data/assets";
import { missionVideo } from "@/data/my-mission";

const SILHOUETTE_FILTER = "grayscale(1) brightness(0.25) contrast(1.3)";
const SILHOUETTE_MASK = "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)";

export function MissionVideoSection() {
  const KickerIcon = missionVideo.kickerIcon;
  const character = characterAssets[missionVideo.characterPose];
  const [titleLead, titleTail] = missionVideo.title.split(missionVideo.titleEmphasis);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <motion.div
        variants={motionVariants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center"
      >
        <motion.div variants={motionVariants.fadeInUp}>
          <Badge variant="outline" className="gap-1.5">
            <KickerIcon className="size-3" aria-hidden="true" />
            {missionVideo.kicker}
          </Badge>
        </motion.div>
        <motion.div variants={motionVariants.fadeInUp}>
          <Heading as="h2" size="xl" className="mt-5 text-balance">
            {titleLead}
            <GradientText>{missionVideo.titleEmphasis}</GradientText>
            {titleTail}
          </Heading>
        </motion.div>
        <motion.p variants={motionVariants.fadeInUp} className="mt-4 text-lg text-muted-foreground">
          {missionVideo.description}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl"
      >
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-10 -top-6 -bottom-6 -z-10 rounded-[2rem] bg-primary/20 blur-[100px]"
        />

        <div className={cn(glass.base, "rounded-3xl p-2 shadow-2xl sm:p-3")}>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b0a17] via-[#141127] to-[#050409]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_25%_30%,rgba(109,40,217,0.35),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_85%,rgba(34,211,238,0.25),transparent_65%)]" />

            <div
              className="absolute inset-y-0 right-0 w-2/3 sm:w-1/2"
              style={{ maskImage: SILHOUETTE_MASK, WebkitMaskImage: SILHOUETTE_MASK }}
            >
              <Image
                src={character.src}
                alt=""
                fill
                sizes="32rem"
                className="object-contain object-bottom"
                style={{ filter: SILHOUETTE_FILTER }}
              />
            </div>

            <motion.div
              aria-hidden="true"
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                type="button"
                aria-label="Play mission video"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex size-16 items-center justify-center rounded-full bg-white/95 text-[#0b0a17] shadow-2xl sm:size-20"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-white/40"
                />
                <Play className="relative ml-1 size-6 fill-current sm:size-7" aria-hidden="true" />
              </motion.button>
            </div>

            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-white/80 sm:right-6 sm:bottom-6 sm:left-6">
              <p className="text-xs font-medium sm:text-sm">The Mission Behind Ismael Ads</p>
              <p className="text-xs font-semibold sm:text-sm">{missionVideo.duration}</p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-2 w-1/3 rounded-full bg-foreground/10 blur-md"
        />
      </motion.div>
    </Section>
  );
}
