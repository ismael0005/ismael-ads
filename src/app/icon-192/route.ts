import { renderAppIcon } from "@/lib/app-icon";

/** Plain route (not the `icon` file convention) so it can be referenced by size from manifest.ts — PWA install icons need explicit 192/512 sizes, not just the browser-tab favicon. */
export const dynamic = "force-static";

export async function GET() {
  return renderAppIcon(192);
}
