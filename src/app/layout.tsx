import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import PercentageLoader from "@/components/loader";

const fontHeader = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-header" });
const fontBody = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mirzozoddaabubakr.vercel.app"),
  title: "ABUBAKR MIRZOZODA | Full-Stack Developer",
  description: "Freelance full-stack web developer from Tajikistan — ~2 years building responsive portfolios, Shopify storefronts, and custom web solutions. Available for remote work worldwide.",
  openGraph: {
    title: "ABUBAKR MIRZOZODA | Creative Engineer",
    description: "Photorealistic 3D experiences and technical web architecture.",
    type: "website",
    url: "https://portfolio.v4",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abubakr Mirzozoda Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABUBAKR MIRZOZODA | Creative Engineer",
    description: "High-fidelity digital architectures and 3D scrollytelling.",
  },
};

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontHeader.variable} ${fontBody.variable}`}>
      <head>
        <link rel="preload" href="/model.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/studio.hdr" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/me.webp" as="image" />
      </head>
      <body className="antialiased font-body selection:bg-[#00ffff]/30 selection:text-white">
        <SmoothScroll>
          <PercentageLoader />
          {children}
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
