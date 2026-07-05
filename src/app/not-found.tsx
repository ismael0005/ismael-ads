import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { characterAssets } from "@/data/assets";

export default function NotFound() {
  const character = characterAssets.thinking;

  return (
    <Section spacing="xl" className="flex min-h-[70vh] items-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Image src={character.src} alt={character.alt} width={220} height={220} className="select-none" priority />

        <span className="mt-8 text-sm font-bold tracking-widest text-muted-foreground uppercase">404</span>
        <Heading as="h1" size="xl" className="mt-3 text-balance">
          This Page Doesn&apos;t Exist
        </Heading>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          The link might be broken, or the page may have moved. Let&apos;s get you back to something useful.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="gradient" size="lg" nativeButton={false} render={<Link href="/">Back To Homepage</Link>} />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={
              <Link href="/blog" className="inline-flex items-center gap-1.5">
                <Search className="size-4" aria-hidden="true" />
                Browse The Blog
              </Link>
            }
          />
        </div>

        <Link
          href="/about/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Or tell us what you were looking for
        </Link>
      </div>
    </Section>
  );
}
