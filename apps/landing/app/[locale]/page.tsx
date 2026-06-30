import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FullscreenImage } from "@/components/ui/fullscreen-image";
import { NestinoOsMap } from "@/components/sections/nestino-os-map";
import { ProductPreviewCarousel } from "@/components/sections/product-preview-carousel";
import { getSiteUrl } from "@/lib/constants";
import { isPublicLocale, type Locale, type PublicLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ServiceGroup = {
  title: string;
  kicker: string;
  text: string;
  items: string[];
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
  services: {
    eyebrow: string;
    title: string;
    text: string;
    centerLabel: string;
    centerText: string;
    groups: [ServiceGroup, ServiceGroup, ServiceGroup];
    flows: Array<[string, string]>;
  };
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
    items: Array<[string, string]>;
    profile: {
      label: string;
      title: string;
      rows: Array<[string, string]>;
    };
  };
  curina: {
    eyebrow: string;
    title: string;
    text: string;
    profileLayers: Array<[string, string]>;
    triggers: Array<[string, string, string]>;
    partners: string[];
    triggerEyebrow: string;
    triggerText: string;
    loop: Array<[string, string]>;
    imageAlt: string;
    imageCaption: string;
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
    services: {
      eyebrow: "Nestino OS",
      title: "One stack for operations, demand, and guest intelligence.",
      text:
        "PMS, Site Builder, and Curina share the same operating memory, so each layer makes the next one smarter.",
      centerLabel: "Nestino OS",
      centerText: "A calm operating layer connecting property work, direct channels, guest memory, and partner data.",
      groups: [
        {
          title: "Nestino PMS",
          kicker: "Property operations core",
          text:
            "Runs the daily hotel workflow and becomes the clean source of truth for rooms, guests, rates, service, and operations.",
          items: [
            "Inventory",
            "Restaurant",
            "Add-on market",
            "Room service",
            "Housekeeping",
            "ARI",
            "Front desk",
            "Pricing engine",
            "Channel manager integrations",
            "Event management",
            "CRM",
            "Content management",
          ],
        },
        {
          title: "Nestino Site Builder",
          kicker: "Direct demand surface",
          text:
            "Turns the property into a fast, branded direct-sales channel with content, traffic growth, and payment flow connected to the operating layer.",
          items: ["Site builder", "Traffic Engine", "PGW"],
        },
        {
          title: "Nestino Curina",
          kicker: "Guest and lifestyle network",
          text:
            "Connects guest profiles, multi-property behavior, community, partner data, and AI recommendations into a richer hospitality network.",
          items: [
            "Guest profile",
            "Multi-hotel integration",
            "Community builder",
            "Data integration: gyms, fashion brands, restaurants, hotels, banks, airlines",
            "AI action recommender",
          ],
        },
      ],
      flows: [
        ["PMS captures operations", "Rooms, service, rates, events, and CRM create the trusted property record."],
        ["Site Builder creates demand", "Traffic and payments bring direct guests back into the operating system."],
        ["Curina enriches identity", "Partner and lifestyle activity makes the guest profile more useful."],
        ["AI recommends next actions", "Nestino can suggest service, pricing, content, offer, and partner actions."],
      ],
    },
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
      title: "One living guest profile, not another CRM record.",
      text:
        "Nestino turns the moments around a stay into one consent-aware profile: what the guest booked, what they prefer, how they like to be served, and what they may want next.",
      items: [
        ["Stay memory", "Past and upcoming stays, room preferences, rate context, arrival details, and booking intent."],
        ["Service notes", "Useful context for front desk, housekeeping, concierge, and management without forcing teams to search across tools."],
        ["Lifestyle signals", "Dining, wellness, cafe, event, retail, and Curina activity that helps the property understand the whole guest journey."],
        ["Personalization layer", "Recommendations and offers become more relevant because they come from a real profile, not a cold audience segment."],
      ],
      profile: {
        label: "Guest profile",
        title: "What Nestino remembers",
        rows: [
          ["Preference", "Quiet room, late checkout, wellness interest"],
          ["Stay context", "Repeat guest, direct booking, arrival notes"],
          ["Curina activity", "Restaurant, spa, gallery, cafe, event"],
          ["Next action", "Relevant offer, service prompt, return-stay idea"],
        ],
      },
    },
    curina: {
      eyebrow: "Curina",
      title: "One profile at the center. A connected city around it.",
      text:
        "Curina keeps a consent-aware guest profile in the middle — preferences, stay history, and service notes — and connects hotels, dining, wellness, culture, and events into one lifestyle network.",
      profileLayers: [
        ["Preferences", "Room ambience, dining style, wellness interests, and lifestyle tags remembered across stays."],
        ["Stay & service context", "Arrival notes, repeat-guest memory, and operational prompts the team can act on immediately."],
        ["Offer recommendations", "Thoughtful partner offers surfaced from the profile, not generic broadcast marketing."],
      ],
      triggerEyebrow: "Trigger-based recommendations",
      triggerText:
        "Nestino watches the signals hotels care about — time since the last stay, recorded preferences, in-stay behavior, and booking patterns — then recommends the next hotel action.",
      triggers: [
        ["90+ days since last checkout", "Past stay on file", "Send a direct rebooking offer with the guest's preferred room type and rate context"],
        ["Guest checks in again", "Previous service notes saved", "Prompt front desk to prepare late checkout, quiet floor, or welcome setup before arrival"],
        ["Second night of stay", "Past in-house dining history", "Recommend hotel restaurant, room service, or partner dinner while the guest is still on property"],
        ["Same season as last year's stay", "Repeat travel pattern", "Offer a return-stay package with remembered preferences already applied"],
        ["48 hours before checkout", "Wellness interest from earlier stays", "Suggest in-house spa, extended checkout, or a partner wellness experience"],
        ["Guest's usual dates become available", "Historical booking pattern", "Reach out with a direct hold before they search OTAs again"],
      ],
      partners: [
        "Boutique hotel",
        "Restaurant",
        "Cafe",
        "Gym",
        "Spa",
        "Gallery",
        "Coworking",
        "Event venue",
      ],
      loop: [
        ["01", "Profile reads the signal"],
        ["02", "Trigger matches the moment"],
        ["03", "Curina recommends the action"],
        ["04", "Outcome feeds the next stay"],
      ],
      imageAlt: "Nestino guest profile connected to Curina lifestyle partners and offer recommendations",
      imageCaption: "Guest profile, partner network, and triggered offer recommendations",
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
    services: {
      eyebrow: "منظومه سرویس‌های نستینو",
      title: "یک لایه برای عملیات، تقاضا و هوش مهمان.",
      text:
        "PMS، Site Builder و Curina از یک حافظه عملیاتی مشترک استفاده می‌کنند تا هر لایه، لایه بعدی را دقیق‌تر کند.",
      centerLabel: "Nestino OS",
      centerText: "یک لایه آرام برای اتصال کار ملک، کانال‌های مستقیم، حافظه مهمان و داده شریک‌ها.",
      groups: [
        {
          title: "Nestino PMS",
          kicker: "هسته عملیات ملک",
          text:
            "جریان روزانه هتل را مدیریت می‌کند و منبع تمیز حقیقت برای اتاق‌ها، مهمان‌ها، نرخ‌ها، سرویس و عملیات می‌شود.",
          items: [
            "Inventory",
            "Restaurant",
            "Add-on market",
            "Room service",
            "Housekeeping",
            "ARI",
            "Front desk",
            "Pricing engine",
            "Channel manager integrations",
            "Event management",
            "CRM",
            "Content management",
          ],
        },
        {
          title: "Nestino Site Builder",
          kicker: "سطح تقاضای مستقیم",
          text:
            "ملک را به یک کانال فروش مستقیم سریع و برندشده تبدیل می‌کند؛ با محتوا، رشد ترافیک و پرداخت متصل به لایه عملیات.",
          items: ["Site builder", "Traffic Engine", "PGW"],
        },
        {
          title: "Nestino Curina",
          kicker: "شبکه مهمان و سبک زندگی",
          text:
            "پروفایل مهمان، رفتار چند‌هتلی، جامعه، داده شریک‌ها و پیشنهادهای AI را به یک شبکه مهمان‌نوازی غنی‌تر وصل می‌کند.",
          items: [
            "Guest profile",
            "Multi-hotel integration",
            "Community builder",
            "Data integration: gyms, fashion brands, restaurants, hotels, banks, airlines",
            "AI action recommender",
          ],
        },
      ],
      flows: [
        ["PMS عملیات را ثبت می‌کند", "اتاق، سرویس، نرخ، رویداد و CRM رکورد قابل اعتماد ملک را می‌سازند."],
        ["Site Builder تقاضا می‌سازد", "ترافیک و پرداخت، مهمان مستقیم را به سیستم عملیاتی برمی‌گردانند."],
        ["Curina هویت را غنی می‌کند", "فعالیت شریک‌ها و سبک زندگی پروفایل مهمان را کاربردی‌تر می‌کند."],
        ["AI اقدام بعدی را پیشنهاد می‌دهد", "نستینو می‌تواند اقدام‌های سرویس، قیمت، محتوا، پیشنهاد و شریک را توصیه کند."],
      ],
    },
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
      title: "یک پروفایل زنده از مهمان، نه فقط یک رکورد CRM دیگر.",
      text:
        "نستینو لحظه‌های اطراف اقامت را به یک پروفایل آگاه از رضایت کاربر تبدیل می‌کند: مهمان چه رزرو کرده، چه چیزی را ترجیح می‌دهد، چطور دوست دارد سرویس بگیرد و احتمالاً بعداً چه می‌خواهد.",
      items: [
        ["حافظه اقامت", "اقامت‌های قبلی و بعدی، ترجیح اتاق، زمینه نرخ، جزئیات ورود و قصد رزرو."],
        ["یادداشت‌های سرویس", "زمینه کاربردی برای پذیرش، خانه‌داری، کانسیرج و مدیریت، بدون جستجو بین چند ابزار."],
        ["سیگنال‌های سبک زندگی", "رستوران، wellness، کافه، رویداد، خرده‌فروشی و فعالیت Curina که مسیر کامل مهمان را روشن‌تر می‌کند."],
        ["لایه شخصی‌سازی", "پیشنهادها زمانی دقیق‌تر می‌شوند که از یک پروفایل واقعی بیایند، نه از یک سگمنت سرد بازاریابی."],
      ],
      profile: {
        label: "پروفایل مهمان",
        title: "نستینو چه چیزی را به خاطر می‌سپارد",
        rows: [
          ["ترجیح", "اتاق آرام، خروج دیرتر، علاقه به wellness"],
          ["زمینه اقامت", "مهمان تکراری، رزرو مستقیم، نکات ورود"],
          ["فعالیت Curina", "رستوران، اسپا، گالری، کافه، رویداد"],
          ["اقدام بعدی", "پیشنهاد مرتبط، یادآوری سرویس، ایده بازگشت"],
        ],
      },
    },
    curina: {
      eyebrow: "Curina",
      title: "یک پروفایل در مرکز. یک شهر متصل اطراف آن.",
      text:
        "Curina یک پروفایل آگاه از رضایت مهمان را در مرکز نگه می‌دارد — ترجیحات، تاریخچه اقامت و یادداشت‌های سرویس — و هتل، غذا، wellness، فرهنگ و رویداد را در یک شبکه سبک زندگی وصل می‌کند.",
      profileLayers: [
        ["ترجیحات", "فضای اتاق، سبک غذا، علاقه wellness و تگ‌های سبک زندگی در اقامت‌های مختلف حفظ می‌شوند."],
        ["زمینه اقامت و سرویس", "نکات ورود، حافظه مهمان تکراری و promptهای عملیاتی که تیم می‌تواند فوراً روی آن‌ها act کند."],
        ["پیشنهادهای offer", "پیشنهادهای شریک مرتبط از روی پروفایل، نه بازاریابی عمومی و سرد."],
      ],
      triggerEyebrow: "پیشنهاد بر اساس trigger",
      triggerText:
        "نستینو سیگنال‌هایی را که برای هتل مهم‌اند دنبال می‌کند — فاصله از آخرین اقامت، ترجیحات ثبت‌شده، رفتار داخل اقامت و الگوی رزرو — و action بعدی هتل را پیشنهاد می‌دهد.",
      triggers: [
        ["بیش از ۹۰ روز از checkout قبلی", "اقامت قبلی در پرونده", "ارسال offer رزرو مستقیم با نوع اتاق و زمینه نرخ ترجیحی مهمان"],
        ["مهمان دوباره check-in می‌کند", "یادداشت‌های سرویس قبلی ذخیره شده", "یادآوری به front desk برای late checkout، طبقه آرام یا welcome setup قبل از ورود"],
        ["شب دوم اقامت", "سابقه dining داخل هتل", "پیشنهاد رستوران هتل، room service یا شام شریک در حین حضور مهمان"],
        ["همان فصل اقامت سال قبل", "الگوی سفر تکراری", "پیشنهاد return-stay package با ترجیحات قبلی از قبل اعمال‌شده"],
        ["۴۸ ساعت قبل از checkout", "علاقه wellness از اقامت‌های قبل", "پیشنهاد spa داخل هتل، checkout دیرتر یا تجربه wellness شریک"],
        ["تاریخ‌های معمول مهمان آزاد می‌شود", "الگوی رزرو تاریخی", "تماس مستقیم با hold روی تاریخ قبل از جستجوی OTA"],
      ],
      partners: [
        "Boutique hotel",
        "Restaurant",
        "Cafe",
        "Gym",
        "Spa",
        "Gallery",
        "Coworking",
        "Event venue",
      ],
      loop: [
        ["۰۱", "پروفایل سیگنال را می‌خواند"],
        ["۰۲", "trigger لحظه را match می‌کند"],
        ["۰۳", "Curina action را recommend می‌کند"],
        ["۰۴", "نتیجه اقامت بعدی را غنی‌تر می‌کند"],
      ],
      imageAlt: "پروفایل مهمان نستینو متصل به شریک‌های Curina و پیشنهادهای offer",
      imageCaption: "پروفایل مهمان، شبکه شریک‌ها و پیشنهادهای trigger-based",
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
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isPublicLocale(raw)) return {};
  const siteUrl = getSiteUrl();
  const locale = raw as PublicLocale;
  const copy = homeCopy[locale];
  const canonicalPath = localizedPath(locale, "/");
  const enPath = localizedPath("en", "/");

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
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
        "x-default": `${siteUrl}${enPath}`,
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isPublicLocale(raw)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const copy = homeCopy[raw as PublicLocale];

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

      <section id="services-map" className="bg-[#EFE8DB]/45 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.services.eyebrow}
            title={copy.services.title}
            text={copy.services.text}
          />
          <NestinoOsMap services={copy.services} />
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow={copy.identity.eyebrow}
              title={copy.identity.title}
              text={copy.identity.text}
            />
            <StoryCardGrid items={copy.identity.items} />
          </div>
          <GuestProfileCard profile={copy.identity.profile} />
        </div>
      </section>

      <section id="curina" className="bg-[#F8F6F1] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={copy.curina.eyebrow}
            title={copy.curina.title}
            text={copy.curina.text}
          />

          <EcosystemImage alt={copy.curina.imageAlt} caption={copy.curina.imageCaption} />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {copy.curina.profileLayers.map(([title, text]) => (
              <article key={title} className="rounded-[28px] border border-[#E8E2D7] bg-white p-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#262626]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#787878]">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[32px] border border-[#E8E2D7] bg-white p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
                  {copy.curina.triggerEyebrow}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#787878]">
                  {copy.curina.triggerText}
                </p>
              </div>
              <CurinaLoop items={copy.curina.loop} />
            </div>
            <CurinaTriggerList triggers={copy.curina.triggers} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {copy.curina.partners.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-[#E8E2D7] bg-white px-4 py-2 text-sm text-[#4B5B4E]"
              >
                {partner}
              </span>
            ))}
          </div>
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
  return <ProductPreviewCarousel label={copy.previewLabel} compact={compact} />;
}

function StoryCardGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([title, text]) => (
        <div key={title} className="rounded-3xl border border-[#E8E2D7] bg-white p-5 shadow-[0_16px_48px_rgba(38,38,38,0.05)]">
          <div className="mb-5 h-1 rounded-full bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent" />
          <p className="font-semibold text-[#262626]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-[#787878]">{text}</p>
        </div>
      ))}
    </div>
  );
}

function GuestProfileCard({
  profile,
}: {
  profile: HomeCopy["identity"]["profile"];
}) {
  return (
    <div className="relative overflow-hidden rounded-[38px] border border-[#E8E2D7] bg-[#F8F6F1] p-5 shadow-[0_24px_80px_rgba(38,38,38,0.08)]">
      <div className="absolute inset-x-10 top-14 h-40 rounded-full bg-[#C8A96A]/20 blur-3xl" />
      <div className="relative rounded-[30px] border border-[#E8E2D7] bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">{profile.label}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#262626]">{profile.title}</h3>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-full border border-[#E8E2D7] bg-[#F8F6F1] text-xl text-[#C8A96A]">
            N
          </div>
        </div>
        <div className="mt-7 space-y-3">
          {profile.rows.map(([label, value]) => (
            <div key={label} className="grid gap-3 rounded-2xl border border-[#E8E2D7] bg-[#F8F6F1]/70 p-4 sm:grid-cols-[0.36fr_0.64fr]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4B5B4E]">{label}</p>
              <p className="text-sm leading-6 text-[#5f5f5f]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CurinaLoop({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([number, label]) => (
        <div key={number} className="flex items-center gap-2 rounded-full border border-[#E8E2D7] bg-[#F8F6F1] px-3 py-2">
          <span className="font-mono text-[11px] text-[#C8A96A]">{number}</span>
          <span className="text-xs font-semibold text-[#262626]">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CurinaTriggerList({
  triggers,
}: {
  triggers: Array<[string, string, string]>;
}) {
  return (
    <div className="grid gap-3">
      {triggers.map(([condition, signal, action]) => (
        <article
          key={condition}
          className="grid gap-3 rounded-[24px] border border-[#E8E2D7] bg-[#F8F6F1]/70 p-4 lg:grid-cols-[1.1fr_0.34fr_1.1fr] lg:items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4B5B4E]">Trigger</p>
            <p className="mt-1 text-sm font-semibold text-[#262626]">{condition}</p>
          </div>
          <div className="hidden text-center text-[#C8A96A] lg:block" aria-hidden>
            →
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4B5B4E]">Signal</p>
              <p className="mt-1 text-sm text-[#5f5f5f]">{signal}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4B5B4E]">Recommended action</p>
              <p className="mt-1 text-sm text-[#5f5f5f]">{action}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function EcosystemImage({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure className="rounded-[34px] border border-[#E8E2D7] bg-white p-3 shadow-[0_24px_80px_rgba(38,38,38,0.10)]">
      <figcaption className="px-2 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4B5B4E]">
        {caption}
      </figcaption>
      <FullscreenImage
        src="/guest-curina-network.png"
        alt={alt}
        width={1024}
        height={640}
        className="h-auto rounded-[24px] border border-[#E8E2D7]"
      />
    </figure>
  );
}
