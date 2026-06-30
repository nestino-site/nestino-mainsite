"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLocaleContext } from "@/components/i18n/locale-provider";
import { localizedPath } from "@/lib/i18n/paths";

const sectionLinks = [
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How it works" },
  { id: "property-os", label: "Property OS" },
  { id: "guest-identity", label: "Guest Identity" },
  { id: "curina", label: "Curina" },
  { id: "engine", label: "Demand Engine" },
] as const;

function scrollToSection(id: string) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export function Navbar() {
  const { locale } = useLocaleContext();
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsElevated(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const homeHref = localizedPath(locale, "/");

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-xl transition",
        isElevated
          ? "border-[#E8E2D7] bg-[#F8F6F1]/94 shadow-sm"
          : "border-transparent bg-[#F8F6F1]/78",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          href={homeHref}
          className="shrink-0 text-lg font-bold tracking-[-0.03em] text-[#262626]"
        >
          Nestino
        </Link>

        <div className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-6 bg-gradient-to-r from-[#F8F6F1] to-transparent sm:w-8"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-6 bg-gradient-to-l from-[#F8F6F1] to-transparent sm:w-8"
            aria-hidden
          />
          <nav
            className="flex gap-1 overflow-x-auto overscroll-x-contain py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1.5 [&::-webkit-scrollbar]:hidden"
            aria-label="On this page"
          >
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold text-[#787878] transition hover:bg-white hover:text-[#262626] sm:text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="hidden rounded-full bg-[#262626] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4B5B4E] sm:inline-flex"
          >
            Early partner
          </a>
        </div>
      </div>
    </header>
  );
}
