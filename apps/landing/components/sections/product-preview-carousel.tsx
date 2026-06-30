"use client";

import { useState } from "react";

import { FullscreenImage } from "@/components/ui/fullscreen-image";

const productPreviews = [
  {
    title: "Daily PMS dashboard",
    hint: "Reservations, rooms, housekeeping, revenue, and actions",
    src: "/pms-panel.png",
    alt: "Nestino PMS dashboard showing reservations calendar, room status, housekeeping, revenue, and quick actions",
  },
  {
    title: "Financial reports",
    hint: "Revenue, ADR, RevPAR, occupancy, and booking mix",
    src: "/pms-financial-reports.png",
    alt: "Nestino PMS financial reports page for hotel revenue, occupancy, ADR, RevPAR, and booking source mix",
  },
  {
    title: "Rooms & inventory",
    hint: "Rates, filled capacity, holds, and remaining rooms",
    src: "/pms-room-inventory.png",
    alt: "Nestino PMS rooms and inventory page showing capacity, rates, held rooms, and remaining availability",
  },
  {
    title: "Restaurant & requests",
    hint: "Guest requests connected to Curina dining signals",
    src: "/pms-restaurant-requests.png",
    alt: "Nestino PMS restaurant and guest requests page showing service requests and Curina recommendation signals",
  },
];

type ProductPreviewCarouselProps = {
  label: string;
  compact?: boolean;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      {direction === "left" ? (
        <path d="M12.5 4.5 7.5 10l5 5.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 4.5 12.5 10l-5 5.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function ProductPreviewCarousel({
  label,
  compact = false,
}: ProductPreviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreview = productPreviews[activeIndex] ?? productPreviews[0]!;
  const total = productPreviews.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  return (
    <figure className="rounded-[34px] border border-[#E8E2D7] bg-white p-3 shadow-[0_24px_80px_rgba(38,38,38,0.10)]">
      <div className="flex items-center justify-between px-2 pb-3">
        <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
          {label}
        </figcaption>
        <span className="font-mono text-xs text-[#787878]">
          {activeIndex + 1} / {total}
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8E2D7] bg-white/95 text-[#4B5B4E] shadow-sm transition hover:border-[#C8A96A] hover:text-[#262626]"
          aria-label="Previous preview"
        >
          <ChevronIcon direction="left" />
        </button>

        <FullscreenImage
          src={activePreview.src}
          alt={activePreview.alt}
          width={1536}
          height={1024}
          priority={!compact && activeIndex === 0}
          className="h-auto rounded-[24px] border border-[#E8E2D7]"
        />

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8E2D7] bg-white/95 text-[#4B5B4E] shadow-sm transition hover:border-[#C8A96A] hover:text-[#262626]"
          aria-label="Next preview"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 px-2">
        <div className="flex items-center gap-2">
          {productPreviews.map((preview, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={preview.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  isActive ? "w-6 bg-[#C8A96A]" : "w-2 bg-[#E8E2D7] hover:bg-[#C8A96A]/60"
                }`}
                aria-label={`Show ${preview.title}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[#262626]">{activePreview.title}</p>
          <p className="mt-1 text-xs text-[#787878]">{activePreview.hint}</p>
        </div>
      </div>
    </figure>
  );
}
