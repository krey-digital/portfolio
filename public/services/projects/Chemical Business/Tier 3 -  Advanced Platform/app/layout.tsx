import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChemCorp Industries - Your Trusted Partner in Quality Chemicals",
  description: "Leading supplier of high-quality industrial chemicals including acids, solvents, alkalis, and specialty chemicals. ISO certified with reliable delivery across India.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ConvexClientProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
