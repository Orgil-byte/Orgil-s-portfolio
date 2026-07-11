import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Inter,
  Noto_Sans_Mongolian,
} from "next/font/google";
import { IntroRevealProvider } from "@/components/intro/intro-reveal-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { ExperienceProvider } from "@/components/providers/experience-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansMongolian = Noto_Sans_Mongolian({
  variable: "--font-noto-sans-mongolian",
  subsets: ["mongolian"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Orgil Ulziitogtokh — Software Engineer",
    template: "%s — Orgil Ulziitogtokh",
  },
  description:
    "Software engineer in Mongolia building polished web products and practical AI-powered systems.",
  openGraph: {
    title: "Orgil Ulziitogtokh — Software Engineer",
    description:
      "Polished web products, thoughtful backend architecture, and practical AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} ${inter.variable} ${notoSansMongolian.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <IntroRevealProvider>
          <ExperienceProvider>
            <SiteHeader />
            {children}
          </ExperienceProvider>
        </IntroRevealProvider>
      </body>
    </html>
  );
}
