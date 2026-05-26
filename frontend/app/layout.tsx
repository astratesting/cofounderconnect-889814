import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoFounderConnect — Find Your Perfect Co-Founder",
  description:
    "CoFounderConnect matches ambitious founders with complementary co-founders using real-time compatibility scoring, skill-gap analysis, and curated introductions. Stop building alone.",
  keywords: [
    "co-founder",
    "startup",
    "founder matching",
    "entrepreneurship",
    "startup community",
  ],
  openGraph: {
    title: "CoFounderConnect — Find Your Perfect Co-Founder",
    description:
      "Real-time co-founder matching for ambitious builders. Find your missing piece.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
