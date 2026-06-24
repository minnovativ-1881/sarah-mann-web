import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarah Mann — Balanced Parenting | Expertin für liebevolle Führung",
  description:
    "Sarah Mann ist Pädagogin, Babyschlafberaterin und Mutter von sieben Kindern. Als führende deutschsprachige Expertin für Balanced Parenting zeigt sie, wie Wärme und Klarheit zusammengehören. Autorin von 'Wer liebt, führt'.",
  keywords: [
    "Balanced Parenting",
    "Erziehung",
    "Sarah Mann",
    "Babyschlafberaterin",
    "Erziehungsexpertin",
    "Gentle Parenting",
    "Autoritative Erziehung",
    "Wer liebt führt",
    "Eltern Grenzen",
    "Kinder Erziehung",
  ],
  authors: [{ name: "Sarah Mann" }],
  openGraph: {
    title: "Sarah Mann — Balanced Parenting",
    description:
      "Warm genug, um zu lieben. Klar genug, um zu führen. Die führende deutschsprachige Expertin für Balanced Parenting.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
