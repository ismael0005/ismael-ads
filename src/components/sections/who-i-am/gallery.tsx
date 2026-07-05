"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { characterAssets } from "@/data/assets";
import { galleryImages, galleryIntro } from "@/data/who-i-am";

const SIZE_HEIGHT: Record<string, string> = {
  sm: "h-56",
  md: "h-72",
  lg: "h-[22rem]",
};

export function WhoIAmGallerySection() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...galleryIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className="mx-auto max-w-5xl columns-2 gap-4 sm:columns-3">
        {galleryImages.map((image, index) => {
          const character = characterAssets[image.pose];
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, rotate: image.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
              className={cn(
                glass.base,
                glass.light,
                "group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl p-2 shadow-lg",
                SIZE_HEIGHT[image.size] ?? "h-64"
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                <Image
                  src={character.src}
                  alt={character.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-contain object-bottom p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs font-medium text-white">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
