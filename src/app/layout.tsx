import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  Instrument_Sans,
  Azeret_Mono,
} from "next/font/google";
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

/** Body and UI copy. Crisp and slightly narrow, so it holds up small. */
const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/** Technical labels, figures and the specimen annotations. */
const mono = Azeret_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goodnesscrafted.com"),
  title: {
    default: "Goodness Crafted | Premium Nuts, Dry Fruits & Blends",
    template: "%s | Goodness Crafted",
  },
  description:
    "Carefully selected nuts, dry fruits and thoughtfully curated blends — with a focus on quality, taste and the simple goodness of real ingredients.",
  openGraph: {
    title: "Goodness Crafted",
    description: "Goodness, thoughtfully crafted.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll reveals start transparent. Without scripting nothing would
            ever reveal them, so the effect is opted out of entirely. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal,.reveal-lift{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
