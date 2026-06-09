import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontOutfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { AnalyticsScript } from "@/components/analytics-script";
import { BackToTop } from "@/components/back-to-top";
import { CardSpotlight } from "@/components/card-spotlight";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildSearchEntries } from "@/lib/search-data";
import { buildAbsoluteUrl, siteConfig, withBasePath } from "@/lib/site-data";

const commandPaletteEntries = buildSearchEntries();

const faviconPath = withBasePath("/favicon.svg");
const socialPreviewPath = buildAbsoluteUrl("/social-preview.svg");
const googleSiteVerificationToken =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "Q1qnn9j21GEvPg9Dx-20kHfxkeiG0zOffzHTG2Dr_Ug";
const themeInitScript = `
  (function () {
    try {
      var key = "atharva-site-theme";
      var stored = window.localStorage.getItem(key);
      var theme = stored === "light" || stored === "dark" ? stored : "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://region1.google-analytics.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-src 'none'",
  "upgrade-insecure-requests"
].join("; ");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: `${siteConfig.name} | ${siteConfig.title}`,
  manifest: withBasePath("/site.webmanifest"),
  verification: {
    google: googleSiteVerificationToken
  },
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: faviconPath
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} | ${siteConfig.title}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialPreviewPath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} portfolio preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [socialPreviewPath]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontInter.variable} ${fontOutfit.variable}`}>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <CardSpotlight />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="page-backdrop page-backdrop-left" />
        <div className="page-backdrop page-backdrop-right" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
        <CommandPalette entries={commandPaletteEntries} />
        <AnalyticsScript />
      </body>
    </html>
  );
}
