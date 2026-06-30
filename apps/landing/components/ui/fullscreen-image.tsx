"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type FullscreenImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export function FullscreenImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: FullscreenImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in text-left"
        aria-label={`View fullscreen: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={className}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#262626]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          Expand
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#262626]/94 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            onClick={() => setOpen(false)}
            aria-label="Close fullscreen image"
          >
            Close
          </button>

          <div
            className="relative max-h-[92vh] max-w-[92vw]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[92vh] max-w-[92vw] rounded-2xl border border-white/10 object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
