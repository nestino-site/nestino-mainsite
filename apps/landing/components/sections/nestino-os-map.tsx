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
  { short: "PMS", label: "Operations", accent: "#4B5B4E" },
  { short: "Site", label: "Direct demand", accent: "#C8A96A" },
  { short: "Curina", label: "Guest intelligence", accent: "#262626" },
] as const;

export function NestinoOsMap({ services }: NestinoOsMapProps) {
  const [active, setActive] = useState(0);
  const group = services.groups[active]!;
  const system = SYSTEMS[active]!;

  return (
    <div className="overflow-hidden rounded-[40px] border border-[#E8E2D7] bg-white shadow-[0_24px_80px_rgba(38,38,38,0.08)]">
      <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C8A96A]">
            {services.centerLabel}
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#5f5f5f]">
            {services.centerText}
          </p>
        </div>

        <div className="rounded-[28px] border border-[#E8E2D7] bg-[#F8F6F1] p-3">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {services.groups.map((item, index) => {
              const meta = SYSTEMS[index]!;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={[
                    "min-w-[8.5rem] rounded-2xl border px-4 py-3 text-left transition",
                    active === index
                      ? "border-[#C8A96A] bg-white shadow-[0_12px_32px_rgba(38,38,38,0.08)]"
                      : "border-transparent bg-transparent hover:bg-white/70",
                  ].join(" ")}
                  aria-pressed={active === index}
                >
                  <span className="block text-xs font-bold uppercase tracking-[0.16em]" style={{ color: meta.accent }}>
                    {meta.short}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#262626]">
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative border-y border-[#E8E2D7] bg-[#F8F6F1] px-5 py-8 sm:px-8">
        <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-[#D8CCB8] lg:block" aria-hidden />
        <div className="relative grid gap-4 lg:grid-cols-[1fr_0.62fr_1fr_1fr] lg:items-center">
          <SystemCard group={services.groups[0]} index={0} active={active} onSelect={setActive} />

          <div className="order-first mx-auto grid h-32 w-32 place-items-center rounded-full border border-[#C8A96A]/45 bg-white text-center shadow-[0_18px_50px_rgba(200,169,106,0.18)] lg:order-none">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8A96A]">
                Nestino
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-[#262626]">
                OS
              </p>
            </div>
          </div>

          <SystemCard group={services.groups[1]} index={1} active={active} onSelect={setActive} />
          <SystemCard group={services.groups[2]} index={2} active={active} onSelect={setActive} />
        </div>
      </div>

      <div className="grid gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: system.accent }}>
            {group.kicker}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#262626]">
            {group.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#787878] sm:text-base">
            {group.text}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4B5B4E]">
            Key modules
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.items.slice(0, 6).map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#E8E2D7] bg-[#F8F6F1] px-3.5 py-2 text-sm text-[#5f5f5f]"
              >
                {item}
              </span>
            ))}
            {group.items.length > 6 ? (
              <span className="rounded-full border border-[#E8E2D7] bg-white px-3.5 py-2 text-sm font-semibold text-[#4B5B4E]">
                +{group.items.length - 6} more
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E2D7] bg-[#F8F6F1]/70 px-5 py-5 sm:px-8">
        <p className="text-sm leading-6 text-[#5f5f5f]">
          <span className="font-semibold text-[#262626]">{services.flows[0]?.[0]}</span>
          <span className="mx-2 text-[#C8A96A]">→</span>
          <span className="font-semibold text-[#262626]">{services.flows[1]?.[0]}</span>
          <span className="mx-2 text-[#C8A96A]">→</span>
          <span className="font-semibold text-[#262626]">{services.flows[2]?.[0]}</span>
          <span className="mx-2 text-[#C8A96A]">→</span>
          <span className="font-semibold text-[#262626]">{services.flows[3]?.[0]}</span>
        </p>
      </div>
    </div>
  );
}

function SystemCard({
  group,
  index,
  active,
  onSelect,
}: {
  group: ServiceGroup;
  index: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  const meta = SYSTEMS[index]!;
  const isActive = active === index;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={[
        "relative rounded-[30px] border bg-white p-5 text-left transition",
        isActive
          ? "border-[#C8A96A] shadow-[0_18px_50px_rgba(38,38,38,0.10)]"
          : "border-[#E8E2D7] hover:border-[#C8A96A]/70",
      ].join(" ")}
      aria-pressed={isActive}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#F8F6F1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: meta.accent }}>
          {meta.short}
        </span>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.accent }} />
      </div>
      <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#262626]">
        {group.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#787878]">
        {meta.label}
      </p>
    </button>
  );
}
