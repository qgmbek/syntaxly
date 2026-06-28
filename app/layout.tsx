import type { Metadata } from "next";
import { Space_Grotesk, Oxanium, Genos, Sansation } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-oxanium",
});

const genos = Genos({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-genos",
});

const sansation = Sansation({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-sansation",
});

export const metadata: Metadata = {
  title: "Syntaxly",
  description: "Quick look at syntaxes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${spaceGrotesk.variable}
        ${oxanium.variable}
        ${genos.variable}
        ${sansation.variable}
      `}
    >
      <body>{children}</body>
    </html>
  );
}
