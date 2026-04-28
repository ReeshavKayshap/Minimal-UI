import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import { Inter, Instrument_Serif } from "next/font/google";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";

import { ThemeProvider } from "@/app/Provider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Minimal UI",
  description: "A collection of minimal UI components",
  openGraph: {
    title: "Minimal UI",
    description: "A collection of minimal UI components",
    siteName: "Minimal UI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Minimal UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimal UI",
    description: "A collection of minimal UI components",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
