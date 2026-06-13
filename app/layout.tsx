import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "@/context/ProjectContext";
import { ServicesProvider } from "@/context/ServicesContext";
import 'remixicon/fonts/remixicon.css';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hetrajsinh Raj | Portfolio",
  description: "Portfolio website of Hetrajsinh Raj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.variable, poppins.variable].join(' ')}>
        <ProjectProvider>
          <ServicesProvider>
            {children}
          </ServicesProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
