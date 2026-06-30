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

export function ProductPreviewCarousel({
  label,
  compact = false,
}: ProductPreviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreview = productPreviews[activeIndex] ?? productPreviews[0]!;

  return (
    <figure className="rounded-[34px] border border-[#E8E2D7] bg-white p-3 shadow-[0_24px_80px_rgba(38,38,38,0.10)]">
      <div className="flex flex-col gap-3 px-2 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
            {label}
          </figcaption>
          <p className="mt-1 text-xs text-[#787878]">{activePreview.hint}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {productPreviews.map((preview, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={preview.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                  isActive
                    ? "border-[#C8A96A] bg-[#F8F1E2] text-[#4B5B4E]"
                    : "border-[#E8E2D7] bg-white text-[#787878] hover:border-[#C8A96A]"
                }`}
                aria-pressed={isActive}
              >
                {preview.title}
              </button>
            );
          })}
        </div>
      </div>

      <FullscreenImage
        src={activePreview.src}
        alt={activePreview.alt}
        width={1536}
        height={1024}
        priority={!compact && activeIndex === 0}
        className="h-auto rounded-[24px] border border-[#E8E2D7]"
      />
    </figure>
  );
}
