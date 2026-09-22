import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Space_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/** Editorial grotesque with real quirk in the letterforms — carries the display type. */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

/** Wonky serif, used only for accent words. Echoes the serif in the printed logo. */
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

/** Typewriter mono for the specimen-sheet annotations and figures. */
const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Goodness Crafted | Premium Dry Fruits & Nuts",
    template: "%s | Goodness Crafted",
  },
  description:
    "Premium almonds, cashews, pistachios, and crafted nut mixes — thoughtfully sourced, freshly packed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
