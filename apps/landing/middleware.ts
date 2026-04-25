import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { isVillaPathLang } from "@/lib/villa-lang-segment";

const CURINA_ASSET_COOKIE = "nestino_curina_assets";

function normalizeOrigin(origin: string): string {
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

function curinaOriginFromEnv(): string | null {
  const raw = process.env.CURINA_ORIGIN?.trim();
  if (!raw) return null;
  try {
    return normalizeOrigin(new URL(raw).origin);
  } catch {
    return null;
  }
}

function refererSuggestsCurina(request: NextRequest): boolean {
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    const path = new URL(referer).pathname;
    return path === "/Curina" || path.startsWith("/Curina/");
  } catch {
    return false;
  }
}

function shouldServeFromCurina(request: NextRequest): boolean {
  if (request.cookies.get(CURINA_ASSET_COOKIE)?.value === "1") return true;
  return refererSuggestsCurina(request);
}

function rewriteToCurina(request: NextRequest, curinaOrigin: string): NextResponse {
  const target = new URL(request.nextUrl.pathname + request.nextUrl.search, curinaOrigin);
  return NextResponse.rewrite(target);
}

function localeFromPathname(pathname: string): Locale | null {
  for (const loc of locales) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return loc;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const curinaOrigin = curinaOriginFromEnv();

  if (pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return NextResponse.next();
  }

  // Curina is hosted as a separate Vercel project and mounted here via
  // next.config rewrites (CURINA_ORIGIN). Do not prefix with /{locale}/.
  if (pathname === "/Curina" || pathname.startsWith("/Curina/")) {
    if (!curinaOrigin) return NextResponse.next();
    const res = NextResponse.next();
    res.cookies.set({
      name: CURINA_ASSET_COOKIE,
      value: "1",
      path: "/",
      // Short-lived: only needed for subresource requests that omit Referer.
      maxAge: 60 * 30,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
    return res;
  }

  if (curinaOrigin && shouldServeFromCurina(request)) {
    if (pathname.startsWith("/_next")) {
      return rewriteToCurina(request, curinaOrigin);
    }
    if (pathname.startsWith("/api")) {
      return rewriteToCurina(request, curinaOrigin);
    }
    if (pathname === "/favicon.ico") {
      return rewriteToCurina(request, curinaOrigin);
    }
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Property sites on the same host: /sites/{subdomain}/{lang}/...
  if (pathname.startsWith("/sites/")) {
    const parts = pathname.split("/").filter(Boolean);
    const siteSlug = parts[1];
    const maybeLang = parts[2];
    const requestHeaders = new Headers(request.headers);
    if (siteSlug) {
      requestHeaders.set("x-nestino-slug", siteSlug);
    }
    requestHeaders.set("x-nestino-villa-ui", "1");
    if (maybeLang && isVillaPathLang(maybeLang)) {
      requestHeaders.set("x-nestino-villa-lang", maybeLang);
    }
    if (parts.length === 2 && siteSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/sites/${siteSlug}/en`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const nextUrl = request.nextUrl.clone();
    const stripped =
      pathname === "/en" ? "/" : pathname.slice("/en".length) || "/";
    nextUrl.pathname = stripped;
    return NextResponse.redirect(nextUrl, 308);
  }

  const existing = localeFromPathname(pathname);
  if (existing) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nestino-locale", existing);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nestino-locale", defaultLocale);
  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/image).*)"],
};
