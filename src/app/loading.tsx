import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <div className="relative size-14">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-xl"
        />
        <span
          aria-hidden="true"
          className="absolute -inset-2 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-accent"
          style={{ animationDuration: "1.1s" }}
        />
        <Image src="/assets/logos/logo-icon.png" alt="Ismael Ads" fill sizes="56px" className="object-contain p-2" />
      </div>
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Loading</p>
    </div>
  );
}
