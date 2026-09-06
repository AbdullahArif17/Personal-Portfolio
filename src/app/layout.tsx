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

import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = "https://my-portfolio-nine-chi-62.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Abdullah Arif | Full Stack Web Developer & MERN Specialist",
    template: "%s | Abdullah Arif",
  },
  description:
    "Abdullah Arif is a Full Stack Web Developer specializing in React, Next.js, TypeScript, and modern MERN stack applications. Explore featured projects, technical skills, and get in touch.",
  keywords: [
    "Abdullah Arif",
    "Abdullah Arif Portfolio",
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer Karachi",
    "Web Developer Pakistan",
    "JavaScript Developer",
    "Freelance Software Engineer",
  ],
  authors: [{ name: "Abdullah Arif", url: siteUrl }],
  creator: "Abdullah Arif",
  publisher: "Abdullah Arif",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdullah Arif | Full Stack Web Developer & MERN Specialist",
    description:
      "Passionate Full Stack Web Developer specializing in React, Next.js, and modern MERN stack architectures. Creating scalable, high-performance digital experiences.",
    url: siteUrl,
    siteName: "Abdullah Arif Portfolio",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Abdullah Arif - Full Stack Web Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Arif | Full Stack Web Developer & MERN Specialist",
    description:
      "Passionate Full Stack Web Developer specializing in React, Next.js, and modern MERN technologies.",
    images: [
      {
        url: "/me.jpg",
        alt: "Abdullah Arif - Full Stack Web Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abdullah Arif",
      alternateName: "Abdullah Arif Developer",
      url: siteUrl,
      image: `${siteUrl}/me.jpg`,
      jobTitle: "Full Stack Web Developer",
      description:
        "Full Stack Web Developer specializing in React, Next.js, TypeScript, Node.js, Express, and modern MERN architectures.",
      sameAs: [
        "https://github.com/AbdullahArif17",
        "https://www.linkedin.com/in/abdullah-arif-89ab862b4/",
        "https://www.facebook.com/rayan.arif.50",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "REST APIs",
        "Full Stack Development",
        "Artificial Intelligence",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "Pakistan",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abdullah Arif - Full Stack Developer Portfolio",
      description:
        "Official portfolio of Abdullah Arif featuring full stack web development projects, skills, CV, and contact details.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
