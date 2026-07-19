// Safeguard for Node 22+ / Node 25+ global localStorage issue during SSR
if (typeof globalThis !== "undefined" && !globalThis.window) {
  try {
    Object.defineProperty(globalThis, "localStorage", {
      get() {
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
          key: () => null,
          length: 0,
        };
      },
      configurable: true,
    });
  } catch {
    // ignore fallback failure
  }
}

import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics";
import CustomCursor from "@/components/custom-cursor";
import ChatWidget from "@/components/PortfolioChat/ChatWidget";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Abdullah Arif - Full Stack Web Developer",
  description: "Passionate Full Stack Web Developer specializing in React, Next.js, and modern MERN technologies. Creating innovative web solutions with exceptional user experiences.",
  keywords: ["Web Developer", "Full Stack", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Abdullah Arif" }],
  creator: "Abdullah Arif",
  publisher: "Abdullah Arif",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://my-portfolio-nine-chi-62.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Abdullah Arif - Full Stack Web Developer",
    description: "Passionate Full Stack Web Developer specializing in React, Next.js, and modern MERN technologies.",
    url: 'https://my-portfolio-nine-chi-62.vercel.app/',
    siteName: 'Abdullah Arif Portfolio',
    images: [
      {
        url: '/me.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdullah Arif - Web Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Abdullah Arif - Full Stack Web Developer",
    description: "Passionate Full Stack Web Developer specializing in React, Next.js, and modern MERN technologies.",
    images: ['/me.jpg'],
    creator: '@your_twitter_handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <CustomCursor />
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
