import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Nitish Modi is a software engineer at Cimpress India. NIT Meghalaya, Guardian on LeetCode, five stars on CodeChef, and two live products: DevPilot AI and FlowPilot AI.";

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Nitish Modi — Software Engineer",
  description,
  authors: [{ name: "Nitish Modi", url: "https://github.com/Nitishmodi" }],
  openGraph: {
    title: "Nitish Modi — Software Engineer",
    description,
    type: "website",
    images: ["/cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Modi — Software Engineer",
    description,
    images: ["/cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nitish Modi",
  jobTitle: "Software Engineer",
  email: "mailto:nitiannitish9999@gmail.com",
  telephone: "+91-8102143055",
  worksFor: {
    "@type": "Organization",
    name: "Cimpress India",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "National Institute of Technology Meghalaya",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hazaribagh",
    addressRegion: "Jharkhand",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/nitish-modi-a11b17227/",
    "https://github.com/Nitishmodi",
    "https://leetcode.com/u/B21CS030/",
    "https://www.codechef.com/users/nitishmodi20",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
