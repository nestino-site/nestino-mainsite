import Link from "next/link";

import { getSiteUrl } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const site = getSiteUrl();

  return (
    <footer className="border-t border-[#E8E2D7] bg-[#262626] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-[-0.03em] text-white">Nestino</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/62">
              Hospitality OS for independent luxury properties. Property operations,
              guest identity, direct demand, and Curina lifestyle partnerships.
            </p>
            <p className="mt-4 text-sm text-white/62">
              <a
                href="mailto:hello@nestino.ai"
                className="font-semibold text-[#C8A96A] hover:underline"
              >
                hello@nestino.ai
              </a>
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white">Company</span>
              <Link href="/Curina" className="text-white/62 hover:text-white">
                Curina
              </Link>
              <Link href="/privacy" className="text-white/62 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/62 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-white/46">
          © {year} Nestino. {site.replace(/^https?:\/\//, "")}
        </p>
      </div>
    </footer>
  );
}
