import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSiteUrl } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const siteUrl = getSiteUrl();
  const locale = raw as Locale;
  const canonicalPath = localizedPath(locale, "/");
  const enPath = localizedPath("en", "/");
  const trPath = localizedPath("tr", "/");

  return {
    title: "Nestino — Hospitality OS for independent luxury properties",
    description:
      "Nestino brings PMS, guest identity, direct demand, and Curina lifestyle partnerships into one clear operating layer for premium hospitality.",
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Nestino",
      title: "Nestino — Hospitality OS for independent luxury properties",
      description:
        "A concise preview of Nestino's Property OS, guest identity layer, Curina network, and autonomous demand engine.",
      images: [
        {
          url: `${siteUrl}/nestino-og.png`,
          width: 1200,
          height: 628,
          alt: "Nestino hospitality operating system",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nestino — Hospitality OS for independent luxury properties",
      description:
        "PMS, guest identity, direct demand, and lifestyle partnerships in one clear operating layer.",
      images: [`${siteUrl}/nestino-og.png`],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${siteUrl}${enPath}`,
        tr: `${siteUrl}${trPath}`,
        "x-default": `${siteUrl}${enPath}`,
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }

  const siteUrl = getSiteUrl();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nestino",
    url: `${siteUrl}${localizedPath(raw, "/")}`,
    description:
      "Nestino is a hospitality operating system for independent luxury properties.",
    publisher: {
      "@type": "Organization",
      name: "Nestino",
      url: siteUrl,
    },
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nestino",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A hospitality operating system connecting PMS workflows, guest identity, direct demand, lifestyle partners, and analytics.",
    offers: {
      "@type": "Offer",
      price: "Contact",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />
      <section id="hero" className="overflow-hidden bg-[#F8F6F1] px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4B5B4E]">
              Hospitality operating system
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-[#262626] sm:text-6xl lg:text-7xl">
              Run the property. Remember the guest. Grow direct demand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5f5f]">
              Nestino brings PMS workflows, guest identity, direct booking growth,
              and Curina lifestyle partnerships into one operating layer for
              independent premium hospitality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-[#262626] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(38,38,38,0.18)] transition hover:bg-[#4B5B4E]"
              >
                Become an early partner
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-[#E8E2D7] bg-white/70 px-6 py-3 text-sm font-semibold text-[#262626] transition hover:border-[#C8A96A]"
              >
                See how it works
              </a>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section id="problem" className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="The problem"
            title="Hospitality data is split across too many tools."
            text="Most properties use separate systems for reservations, guests, operations, revenue, and marketing. The result is duplicated identity, weak direct demand, and no single view of the guest."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Fragmented operations", "PMS, housekeeping, CRM, revenue, and maintenance rarely feel like one system."],
              ["Lost guest memory", "A repeat guest can still look new because identity is scattered across experiences."],
              ["Weak direct demand", "Search, AI discovery, and partner channels need continuous work, not a one-time website."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[28px] border border-[#E8E2D7] bg-[#F8F6F1] p-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#262626]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#787878]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#EFE8DB]/70 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="How it works"
            title="One simple operating model."
            text="We start with the operational layer, connect guest identity, then improve direct demand continuously."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Connect operations", "Reservations, rooms, housekeeping, revenue, maintenance, and guest context in one clean PMS layer."],
              ["02", "Unify guest identity", "Turn stays, dining, wellness, and Curina activity into a consent-aware profile."],
              ["03", "Improve demand", "Crawl, diagnose, execute, measure, and iterate across SEO, AI search, and direct channels."],
            ].map(([n, title, text]) => (
              <article key={n} className="rounded-[32px] bg-white p-7 shadow-[0_20px_60px_rgba(38,38,38,0.07)]">
                <span className="font-mono text-sm text-[#C8A96A]">{n}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#262626]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#787878]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="property-os" className="bg-[#F8F6F1] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              eyebrow="Property OS"
              title="The PMS panel is the first surface."
              text="The goal is not another dashboard. It is a calm control panel for the daily work of a premium property."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {["Reservations", "Rooms", "Housekeeping", "Guests", "Rates", "Maintenance", "Reports"].map((item) => (
                <span key={item} className="rounded-full border border-[#E8E2D7] bg-white px-4 py-2 text-sm text-[#4B5B4E]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ProductPreview compact />
        </div>
      </section>

      <section id="guest-identity" className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Guest Identity"
            title="One guest profile across the whole experience."
            text="Nestino should remember what matters: stay history, preferences, service notes, lifestyle activity, and direct booking intent."
          />
          <SignalGrid
            items={["Hotel stay", "Restaurant", "Gym", "Cafe", "Spa", "Event", "Retail", "Airport lounge"]}
          />
        </div>
      </section>

      <section id="curina" className="bg-[#F8F6F1] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Curina"
            title="The lifestyle network around the stay."
            text="Hotels, restaurants, cafes, gyms, wellness spaces, and local experiences become part of one guest journey."
          />
          <SignalGrid
            items={["Boutique hotel", "Luxury cafe", "Gym", "Restaurant", "Wellness", "Gallery", "Coworking", "Event venue"]}
          />
        </div>
      </section>

      <section id="engine" className="bg-[#262626] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Demand engine"
            title="The real engine keeps improving."
            text="Nestino continuously works on direct demand: SEO discovery, on-site optimization, AI search visibility, off-site mentions, and multilingual growth."
            dark
          />
          <div className="grid gap-3 md:grid-cols-6">
            {["Crawl", "Diagnose", "Decide", "Execute", "Measure", "Iterate"].map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/8 p-5 text-center">
                <span className="font-mono text-xs text-[#C8A96A]">0{index + 1}</span>
                <p className="mt-3 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#F8F6F1] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[40px] border border-[#E8E2D7] bg-white p-8 text-center shadow-[0_24px_80px_rgba(38,38,38,0.08)] sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4B5B4E]">
            Early partner access
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#262626] sm:text-5xl">
            We are building with the first partner properties now.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#787878]">
            No fake customer logos. No invented metrics. If you want to shape the
            first Nestino Property OS and Curina network, start the conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@nestino.ai?subject=Nestino%20early%20partner%20conversation"
              className="rounded-full bg-[#262626] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4B5B4E]"
            >
              Email Nestino
            </a>
            <Link
              href="/Curina"
              className="rounded-full border border-[#E8E2D7] px-6 py-3 text-sm font-semibold text-[#262626] transition hover:border-[#C8A96A]"
            >
              View Curina
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-[#C8A96A]" : "text-[#4B5B4E]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl ${dark ? "text-white" : "text-[#262626]"}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${dark ? "text-white/66" : "text-[#787878]"}`}>
        {text}
      </p>
    </div>
  );
}

function ProductPreview({ compact = false }: { compact?: boolean }) {
  return (
    <figure className="rounded-[34px] border border-[#E8E2D7] bg-white p-3 shadow-[0_24px_80px_rgba(38,38,38,0.10)]">
      <div className="flex items-center justify-between px-2 pb-3">
        <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
          Product preview
        </figcaption>
        <span className="text-xs text-[#787878]">Illustrative PMS panel</span>
      </div>
      <Image
        src="/pms-panel.png"
        alt="Nestino PMS panel product preview"
        width={1536}
        height={1024}
        priority={!compact}
        className="h-auto rounded-[24px] border border-[#E8E2D7]"
      />
    </figure>
  );
}

function SignalGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="rounded-3xl border border-[#E8E2D7] bg-white p-5 shadow-[0_16px_48px_rgba(38,38,38,0.05)]">
          <div className="mb-5 h-1 rounded-full bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent" />
          <p className="font-semibold text-[#262626]">{item}</p>
          <p className="mt-2 text-sm text-[#787878]">Connected signal</p>
        </div>
      ))}
    </div>
  );
}
