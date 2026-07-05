"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { accentChipClasses, accentTextClasses } from "@/lib/accent";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { characterAssets } from "@/data/assets";
import { storyChapters, storyIntro } from "@/data/who-i-am";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_FILTER = [
  "drop-shadow(0 0 26px rgba(109,40,217,0.32))",
  "drop-shadow(0 0 50px rgba(34,211,238,0.16))",
  "drop-shadow(-6px -7px 14px rgba(34,211,238,0.2))",
  "drop-shadow(6px 9px 16px rgba(0,0,0,0.28))",
].join(" ");

const CHAPTER_MASK = "radial-gradient(ellipse 66% 80% at 50% 45%, black 45%, transparent 90%)";

function ChapterPortrait({ chapter }: { chapter: (typeof storyChapters)[number] }) {
  const character = characterAssets[chapter.characterPose];
  const glowStyle: CSSProperties = {
    background:
      "radial-gradient(circle, rgba(109,40,217,0.4) 0%, rgba(37,99,235,0.26) 35%, rgba(34,211,238,0.16) 58%, transparent 76%)",
  };

  return (
    <div className="relative mx-auto aspect-square w-56 sm:w-72">
      <div aria-hidden="true" style={glowStyle} className="absolute -inset-[45%] -z-10 rounded-full blur-[60px] mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute inset-0" style={{ maskImage: CHAPTER_MASK, WebkitMaskImage: CHAPTER_MASK }}>
        <Image
          src={character.src}
          alt={character.alt}
          fill
          sizes="18rem"
          className="object-contain"
          style={{ filter: CHAPTER_FILTER }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          glass.base,
          glass.light,
          "absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap text-foreground shadow-lg"
        )}
      >
        {chapter.year}
      </motion.span>
    </div>
  );
}

export function WhoIAmStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={sectionRef} id="my-story" className="scroll-mt-24">
      <Section spacing="lg" className="relative overflow-hidden">
        <SectionHeading {...storyIntro} className="mx-auto mb-16 max-w-2xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute top-2 bottom-2 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
          <div
            ref={progressRef}
            style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            className="absolute top-2 bottom-2 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-accent lg:block"
          />

          <div className="space-y-20 lg:space-y-28">
            {storyChapters.map((chapter, index) => {
              const Icon = chapter.icon;
              const imageFirst = chapter.layout === "image-left";
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={cn(!imageFirst && "lg:order-2")}>
                    <ChapterPortrait chapter={chapter} />
                  </div>

                  <div className={cn("text-center lg:text-left", !imageFirst && "lg:order-1")}>
                    <div className="flex items-center justify-center gap-2 lg:justify-start">
                      <span className={cn("flex size-9 items-center justify-center rounded-xl ring-1", accentChipClasses[chapter.accent])}>
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <span className={cn("text-xs font-bold tracking-wide uppercase", accentTextClasses[chapter.accent])}>
                        Chapter {index + 1} · {chapter.year}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">{chapter.title}</h3>
                    <p className="mt-3 text-base text-muted-foreground">{chapter.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
