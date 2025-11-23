import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next-Level Gaming Zone | Play & Compete",
  description: "Join Next-Level Gaming Zone for immersive PC, PS5, VR, and pool gaming sessions.",
  keywords: ["Gaming", "PC Games", "VR", "PS5", "Next-Level Gaming", "Game Center"],
  openGraph: {
    title: "Next-Level Gaming Zone",
    description: "Play PC, PS5, VR, and pool games at Next-Level Gaming Zone.",
    url: "https://next-level-gamezone.vercel.app/",
    siteName: "Next-Level Gaming Zone",
    images: [
      {
        url: "/assets/nextLvl.png",
        width: 1200,
        height: 630,
        alt: "Next-Level Gaming Zone",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  dark`}
      >
          <Toaster richColors position="top-right" /> {/* 👈 important */}
        {children}
      </body>
    </html>
  );
}
