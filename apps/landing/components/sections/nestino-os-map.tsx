"use client";

import { useState } from "react";

type ServiceGroup = {
  title: string;
  kicker: string;
  text: string;
  items: string[];
};

type NestinoOsMapProps = {
  services: {
    centerLabel: string;
    centerText: string;
    groups: [ServiceGroup, ServiceGroup, ServiceGroup];
    flows: Array<[string, string]>;
  };
};

const SYSTEMS = [
  { short: "PMS", accent: "#4B5B4E", glow: "rgba(75,91,78,0.18)" },
  { short: "Site", accent: "#C8A96A", glow: "rgba(200,169,106,0.22)" },
  { short: "Curina", accent: "#262626", glow: "rgba(38,38,38,0.12)" },
] as const;

const NODE_POSITIONS = [
  { cx: 120, cy: 160 },
  { cx: 680, cy: 72 },
  { cx: 680, cy: 248 },
];

export function NestinoOsMap({ services }: NestinoOsMapProps) {
  const [active, setActive] = useState(0);
  const group = services.groups[active]!;
  const system = SYSTEMS[active]!;

  return (
    <div className="overflow-hidden rounded-[40px] border border-[#E8E2D7] bg-[#262626] shadow-[0_32px_100px_rgba(38,38,38,0.18)]">
      <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C8A96A]">
              {services.centerLabel}
            </p>
            <p className="mt-3 text-base leading-7 text-white/72 sm:text-lg">
              {services.centerText}
            </p>
          </div>

          <div className="flex rounded-full border border-white/10 bg-white/6 p-1">
            {services.groups.map((item, index) => {
              const meta = SYSTEMS[index]!;
              return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                className={[
                  "rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5",
                  active === index
                    ? "bg-white text-[#262626] shadow-sm"
                    : "text-white/62 hover:text-white",
                ].join(" ")}
                aria-pressed={active === index}
              >
                {meta.short}
              </button>
            );
            })}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${system.glow} 0%, transparent 58%)`,
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <svg
            viewBox="0 0 800 320"
            className="h-auto w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="nestino-hub" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C8A96A" />
                <stop offset="100%" stopColor="#E8D49E" />
              </linearGradient>
            </defs>

            {NODE_POSITIONS.map((node, index) => (
              <line
                key={node.cx}
                x1="400"
                y1="160"
                x2={node.cx}
                y2={node.cy}
                stroke={active === index ? SYSTEMS[index]!.accent : "rgba(255,255,255,0.14)"}
                strokeWidth={active === index ? 2.5 : 1.5}
                strokeDasharray={active === index ? undefined : "5 6"}
              />
            ))}

            <circle cx="400" cy="160" r="58" fill="url(#nestino-hub)" opacity="0.95" />
            <circle cx="400" cy="160" r="72" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <text
              x="400"
              y="154"
              textAnchor="middle"
              fill="#262626"
              fontSize="13"
              fontWeight="700"
              letterSpacing="3"
            >
              NESTINO
            </text>
            <text x="400" y="174" textAnchor="middle" fill="#262626" fontSize="11" fontWeight="600">
              OS
            </text>

            {NODE_POSITIONS.map((node, index) => {
              const isActive = active === index;
              const accent = SYSTEMS[index]!.accent;
              return (
                <g
                  key={node.cx}
                  className="cursor-pointer"
                  onClick={() => setActive(index)}
                  role="button"
                  aria-label={services.groups[index]!.title}
                >
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isActive ? 34 : 28}
                    fill={isActive ? accent : "rgba(255,255,255,0.08)"}
                    stroke={isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 4}
                    textAnchor="middle"
                    fill={isActive ? "#F8F6F1" : "rgba(255,255,255,0.72)"}
                    fontSize="12"
                    fontWeight="700"
                  >
                    {SYSTEMS[index]!.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#F8F6F1] px-5 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: system.accent }}
            >
              {group.kicker}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#262626]">
              {group.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#787878] sm:text-base">
              {group.text}
            </p>
          </div>

          <div className="rounded-[28px] border border-[#E8E2D7] bg-white p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4B5B4E]">
              Modules
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#E8E2D7]/80 bg-[#F8F6F1]/70 px-3.5 py-3"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: system.accent }}
                  />
                  <span className="text-sm leading-6 text-[#5f5f5f]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {services.flows.map(([title, text], index) => (
            <article
              key={title}
              className="relative rounded-[24px] border border-[#E8E2D7] bg-white px-4 py-4"
            >
              {index < services.flows.length - 1 ? (
                <span
                  className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[#C8A96A] md:block"
                  aria-hidden
                />
              ) : null}
              <span className="font-mono text-[11px] text-[#C8A96A]">
                0{index + 1}
              </span>
              <h4 className="mt-2 text-sm font-semibold text-[#262626]">{title}</h4>
              <p className="mt-1.5 text-xs leading-5 text-[#787878]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
