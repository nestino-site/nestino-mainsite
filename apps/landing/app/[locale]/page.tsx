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

type HomeCopy = {
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  primaryCta: string;
  secondaryCta: string;
  problem: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<[string, string]>;
  };
  how: {
    eyebrow: string;
    title: string;
    text: string;
    steps: Array<[string, string, string]>;
  };
  property: {
    eyebrow: string;
    title: string;
    text: string;
    modules: string[];
  };
  identity: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
  };
  curina: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
  };
  engine: {
    eyebrow: string;
    title: string;
    text: string;
    steps: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    curina: string;
  };
  previewLabel: string;
  previewHint: string;
  previewAlt: string;
  signalLabel: string;
};

const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    metaTitle: "Nestino — Hospitality OS for independent luxury properties",
    metaDescription:
      "Nestino brings PMS, guest identity, direct demand, and Curina lifestyle partnerships into one clear operating layer for premium hospitality.",
    ogDescription:
      "A concise preview of Nestino's Property OS, guest identity layer, Curina network, and autonomous demand engine.",
    twitterDescription:
      "PMS, guest identity, direct demand, and lifestyle partnerships in one clear operating layer.",
    heroEyebrow: "Hospitality operating system",
    heroTitle: "Run the property. Remember the guest. Grow direct demand.",
    heroText:
      "Nestino brings PMS workflows, guest identity, direct booking growth, and Curina lifestyle partnerships into one operating layer for independent premium hospitality.",
    primaryCta: "Become an early partner",
    secondaryCta: "See how it works",
    problem: {
      eyebrow: "The problem",
      title: "Hospitality data is split across too many tools.",
      text:
        "Most properties use separate systems for reservations, guests, operations, revenue, and marketing. The result is duplicated identity, weak direct demand, and no single view of the guest.",
      items: [
        ["Fragmented operations", "PMS, housekeeping, CRM, revenue, and maintenance rarely feel like one system."],
        ["Lost guest memory", "A repeat guest can still look new because identity is scattered across experiences."],
        ["Weak direct demand", "Search, AI discovery, and partner channels need continuous work, not a one-time website."],
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "One simple operating model.",
      text:
        "We start with the operational layer, connect guest identity, then improve direct demand continuously.",
      steps: [
        ["01", "Connect operations", "Reservations, rooms, housekeeping, revenue, maintenance, and guest context in one clean PMS layer."],
        ["02", "Unify guest identity", "Turn stays, dining, wellness, and Curina activity into a consent-aware profile."],
        ["03", "Improve demand", "Crawl, diagnose, execute, measure, and iterate across SEO, AI search, and direct channels."],
      ],
    },
    property: {
      eyebrow: "Property OS",
      title: "The PMS panel is the first surface.",
      text:
        "The goal is not another dashboard. It is a calm control panel for the daily work of a premium property.",
      modules: ["Reservations", "Rooms", "Housekeeping", "Guests", "Rates", "Maintenance", "Reports"],
    },
    identity: {
      eyebrow: "Guest Identity",
      title: "One guest profile across the whole experience.",
      text:
        "Nestino should remember what matters: stay history, preferences, service notes, lifestyle activity, and direct booking intent.",
      items: ["Hotel stay", "Restaurant", "Gym", "Cafe", "Spa", "Event", "Retail", "Airport lounge"],
    },
    curina: {
      eyebrow: "Curina",
      title: "The lifestyle network around the stay.",
      text:
        "Hotels, restaurants, cafes, gyms, wellness spaces, and local experiences become part of one guest journey.",
      items: ["Boutique hotel", "Luxury cafe", "Gym", "Restaurant", "Wellness", "Gallery", "Coworking", "Event venue"],
    },
    engine: {
      eyebrow: "Demand engine",
      title: "The real engine keeps improving.",
      text:
        "Nestino continuously works on direct demand: SEO discovery, on-site optimization, AI search visibility, off-site mentions, and multilingual growth.",
      steps: ["Crawl", "Diagnose", "Decide", "Execute", "Measure", "Iterate"],
    },
    contact: {
      eyebrow: "Early partner access",
      title: "We are building with the first partner properties now.",
      text:
        "No fake customer logos. No invented metrics. If you want to shape the first Nestino Property OS and Curina network, start the conversation.",
      email: "Email Nestino",
      curina: "View Curina",
    },
    previewLabel: "Product preview",
    previewHint: "Illustrative PMS panel",
    previewAlt: "Nestino PMS panel product preview",
    signalLabel: "Connected signal",
  },
  fa: {
    metaTitle: "Nestino — سیستم عامل مهمان‌نوازی برای اقامتگاه‌های لوکس مستقل",
    metaDescription:
      "نستینو PMS، هویت مهمان، تقاضای مستقیم و شبکه Curina را در یک لایه عملیاتی روشن برای مهمان‌نوازی پریمیوم یکپارچه می‌کند.",
    ogDescription:
      "معرفی کوتاه Property OS نستینو، هویت مهمان، شبکه Curina و موتور رشد تقاضای مستقیم.",
    twitterDescription:
      "PMS، هویت مهمان، تقاضای مستقیم و همکاری‌های سبک زندگی در یک لایه عملیاتی روشن.",
    heroEyebrow: "سیستم عامل مهمان‌نوازی",
    heroTitle: "ملک را مدیریت کن. مهمان را به یاد بسپار. تقاضای مستقیم بساز.",
    heroText:
      "نستینو جریان‌های کاری PMS، هویت مهمان، رشد رزرو مستقیم و همکاری‌های Curina را برای اقامتگاه‌های لوکس مستقل در یک لایه عملیاتی جمع می‌کند.",
    primaryCta: "همکار اولیه شوید",
    secondaryCta: "ببینید چطور کار می‌کند",
    problem: {
      eyebrow: "مسئله",
      title: "داده‌های مهمان‌نوازی بین ابزارهای زیادی پخش شده‌اند.",
      text:
        "بیشتر اقامتگاه‌ها برای رزرو، مهمان، عملیات، درآمد و بازاریابی از سیستم‌های جدا استفاده می‌کنند. نتیجه: هویت تکراری، تقاضای مستقیم ضعیف و نبود یک تصویر واحد از مهمان.",
      items: [
        ["عملیات تکه‌تکه", "PMS، خانه‌داری، CRM، درآمد و نگهداری معمولاً مثل یک سیستم واحد کار نمی‌کنند."],
        ["حافظه مهمان از دست می‌رود", "حتی مهمان تکراری هم ممکن است جدید به نظر برسد، چون هویت او بین تجربه‌های مختلف پخش شده است."],
        ["تقاضای مستقیم ضعیف است", "جستجو، کشف در هوش مصنوعی و کانال‌های شریک نیاز به کار مداوم دارند، نه فقط یک وب‌سایت یک‌باره."],
      ],
    },
    how: {
      eyebrow: "روش کار",
      title: "یک مدل عملیاتی ساده.",
      text:
        "از لایه عملیات شروع می‌کنیم، هویت مهمان را وصل می‌کنیم و سپس تقاضای مستقیم را به شکل مداوم بهتر می‌کنیم.",
      steps: [
        ["۰۱", "اتصال عملیات", "رزروها، اتاق‌ها، خانه‌داری، درآمد، نگهداری و زمینه مهمان در یک لایه PMS تمیز کنار هم قرار می‌گیرند."],
        ["۰۲", "یکپارچه‌سازی هویت مهمان", "اقامت، رستوران، wellness و فعالیت Curina به یک پروفایل آگاه از رضایت کاربر تبدیل می‌شوند."],
        ["۰۳", "بهبود تقاضا", "خزش، تشخیص، اجرا، اندازه‌گیری و تکرار روی SEO، جستجوی AI و کانال‌های مستقیم انجام می‌شود."],
      ],
    },
    property: {
      eyebrow: "Property OS",
      title: "پنل PMS اولین سطح محصول است.",
      text:
        "هدف ساخت یک داشبورد دیگر نیست؛ هدف یک پنل آرام و دقیق برای کار روزانه یک اقامتگاه پریمیوم است.",
      modules: ["رزروها", "اتاق‌ها", "خانه‌داری", "مهمان‌ها", "نرخ‌ها", "نگهداری", "گزارش‌ها"],
    },
    identity: {
      eyebrow: "هویت مهمان",
      title: "یک پروفایل مهمان برای کل تجربه.",
      text:
        "نستینو باید چیزهای مهم را به خاطر بسپارد: تاریخچه اقامت، ترجیحات، یادداشت‌های سرویس، فعالیت سبک زندگی و قصد رزرو مستقیم.",
      items: ["اقامت هتل", "رستوران", "باشگاه", "کافه", "اسپا", "رویداد", "خرده‌فروشی", "لانژ فرودگاه"],
    },
    curina: {
      eyebrow: "Curina",
      title: "شبکه سبک زندگی پیرامون اقامت.",
      text:
        "هتل‌ها، رستوران‌ها، کافه‌ها، باشگاه‌ها، wellness و تجربه‌های محلی بخشی از یک مسیر مهمان می‌شوند.",
      items: ["بوتیک‌هتل", "کافه لوکس", "باشگاه", "رستوران", "wellness", "گالری", "فضای کار", "محل رویداد"],
    },
    engine: {
      eyebrow: "موتور تقاضا",
      title: "موتور واقعی همیشه بهتر می‌شود.",
      text:
        "نستینو به شکل مداوم روی تقاضای مستقیم کار می‌کند: کشف SEO، بهینه‌سازی داخل سایت، دیده‌شدن در جستجوی AI، اشاره‌های بیرونی و رشد چندزبانه.",
      steps: ["خزش", "تشخیص", "تصمیم", "اجرا", "اندازه‌گیری", "تکرار"],
    },
    contact: {
      eyebrow: "دسترسی همکاران اولیه",
      title: "الان در حال ساخت با اولین اقامتگاه‌های همکار هستیم.",
      text:
        "نه لوگوی مشتری جعلی، نه عددسازی. اگر می‌خواهید در شکل‌دادن اولین Property OS نستینو و شبکه Curina نقش داشته باشید، گفتگو را شروع کنید.",
      email: "ایمیل به نستینو",
      curina: "مشاهده Curina",
    },
    previewLabel: "پیش‌نمایش محصول",
    previewHint: "نمونه تصویری پنل PMS",
    previewAlt: "پیش‌نمایش پنل PMS نستینو",
    signalLabel: "سیگنال متصل",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const siteUrl = getSiteUrl();
  const locale = raw as Locale;
  const copy = homeCopy[locale];
  const canonicalPath = localizedPath(locale, "/");
  const enPath = localizedPath("en", "/");
  const faPath = localizedPath("fa", "/");

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Nestino",
      title: copy.metaTitle,
      description: copy.ogDescription,
      images: [
        {
          url: `${siteUrl}/nestino-og.png`,
          width: 1200,
          height: 628,
          alt: copy.previewAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.twitterDescription,
      images: [`${siteUrl}/nestino-og.png`],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${siteUrl}${enPath}`,
        fa: `${siteUrl}${faPath}`,
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
  const copy = homeCopy[raw];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nestino",
    url: `${siteUrl}${localizedPath(raw, "/")}`,
    description: copy.metaDescription,
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
    description: copy.metaDescription,
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
              {copy.heroEyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-[#262626] sm:text-6xl lg:text-7xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5f5f]">
              {copy.heroText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-[#262626] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(38,38,38,0.18)] transition hover:bg-[#4B5B4E]"
              >
                {copy.primaryCta}
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-[#E8E2D7] bg-white/70 px-6 py-3 text-sm font-semibold text-[#262626] transition hover:border-[#C8A96A]"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <ProductPreview copy={copy} />
        </div>
      </section>

      <section id="problem" className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.problem.eyebrow}
            title={copy.problem.title}
            text={copy.problem.text}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.problem.items.map(([title, text]) => (
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
            eyebrow={copy.how.eyebrow}
            title={copy.how.title}
            text={copy.how.text}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.how.steps.map(([n, title, text]) => (
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
              eyebrow={copy.property.eyebrow}
              title={copy.property.title}
              text={copy.property.text}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {copy.property.modules.map((item) => (
                <span key={item} className="rounded-full border border-[#E8E2D7] bg-white px-4 py-2 text-sm text-[#4B5B4E]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <ProductPreview compact copy={copy} />
        </div>
      </section>

      <section id="guest-identity" className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.identity.eyebrow}
            title={copy.identity.title}
            text={copy.identity.text}
          />
          <SignalGrid items={copy.identity.items} signalLabel={copy.signalLabel} />
        </div>
      </section>

      <section id="curina" className="bg-[#F8F6F1] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.curina.eyebrow}
            title={copy.curina.title}
            text={copy.curina.text}
          />
          <SignalGrid items={copy.curina.items} signalLabel={copy.signalLabel} />
        </div>
      </section>

      <section id="engine" className="bg-[#262626] px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.engine.eyebrow}
            title={copy.engine.title}
            text={copy.engine.text}
            dark
          />
          <div className="grid gap-3 md:grid-cols-6">
            {copy.engine.steps.map((step, index) => (
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
            {copy.contact.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#262626] sm:text-5xl">
            {copy.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#787878]">
            {copy.contact.text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@nestino.ai?subject=Nestino%20early%20partner%20conversation"
              className="rounded-full bg-[#262626] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4B5B4E]"
            >
              {copy.contact.email}
            </a>
            <Link
              href="/Curina"
              className="rounded-full border border-[#E8E2D7] px-6 py-3 text-sm font-semibold text-[#262626] transition hover:border-[#C8A96A]"
            >
              {copy.contact.curina}
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

function ProductPreview({
  copy,
  compact = false,
}: {
  copy: HomeCopy;
  compact?: boolean;
}) {
  return (
    <figure className="rounded-[34px] border border-[#E8E2D7] bg-white p-3 shadow-[0_24px_80px_rgba(38,38,38,0.10)]">
      <div className="flex items-center justify-between px-2 pb-3">
        <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
          {copy.previewLabel}
        </figcaption>
        <span className="text-xs text-[#787878]">{copy.previewHint}</span>
      </div>
      <Image
        src="/pms-panel.png"
        alt={copy.previewAlt}
        width={1536}
        height={1024}
        priority={!compact}
        className="h-auto rounded-[24px] border border-[#E8E2D7]"
      />
    </figure>
  );
}

function SignalGrid({
  items,
  signalLabel,
}: {
  items: string[];
  signalLabel: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="rounded-3xl border border-[#E8E2D7] bg-white p-5 shadow-[0_16px_48px_rgba(38,38,38,0.05)]">
          <div className="mb-5 h-1 rounded-full bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent" />
          <p className="font-semibold text-[#262626]">{item}</p>
          <p className="mt-2 text-sm text-[#787878]">{signalLabel}</p>
        </div>
      ))}
    </div>
  );
}
