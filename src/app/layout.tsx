import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/constants/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// تكوين الخطوط
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
});

// بيانات SEO محسنة من config
export const metadata: Metadata = {
  title: {
    default: siteConfig?.site?.fullName || "أصيل الصبري",
    template: `%s | ${siteConfig?.site?.name || "الموقع الشخصي"}`,
  },
  description: siteConfig?.bio?.summary || "مطور ويب متكامل من اليمن",
  keywords: siteConfig?.keywords || [],
  authors: [{ name: siteConfig?.site?.fullName || "أصيل الصبري" }],
  creator: siteConfig?.site?.fullName,
  publisher: siteConfig?.site?.fullName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig?.site?.url || "https://aseel-portfolio-eight.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig?.site?.fullName,
    description: siteConfig?.bio?.summary,
    url: siteConfig?.site?.url,
    siteName: siteConfig?.site?.name,
    images: [
      {
        url: siteConfig?.site?.ogImage || "/profile.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig?.site?.fullName,
      },
    ],
    locale: siteConfig?.site?.locale || "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig?.site?.fullName,
    description: siteConfig?.bio?.summary,
    images: [siteConfig?.site?.ogImage || "/profile.jpg"],
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
  verification: {
    // هذي القيمة تجيبها من Google Search Console - شرح بالأسفل
    google: "google5ac89ed0bff...", // ضع رمز التحقق الخاص بك هنا
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig?.site?.lang || "ar"}
      dir={siteConfig?.site?.dir || "rtl"}
      className="scroll-smooth"
    >
      <head />
      <body
        className={`${inter.variable} ${cairo.variable} font-arabic antialiased bg-gray-50`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}