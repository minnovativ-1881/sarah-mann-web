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
  title: "Sarah Mann — Klare Führung, volle Liebe",
  description:
    "Sarah Mann ist Pädagogin, Babyschlafberaterin und Mutter von sieben Kindern. Sie zeigt Eltern einen Weg, der Wärme und Klarheit verbindet: liebevoll erziehen, ohne sich selbst zu verlieren.",
  keywords: [
    "Sarah Mann",
    "Erziehung",
    "klare Führung",
    "Grenzen setzen",
    "Erziehungsexpertin",
    "Babyschlafberaterin",
    "autoritative Erziehung",
    "Eltern Erschöpfung",
    "Kinder Erziehung",
    "Balanced Parenting",
  ],
  authors: [{ name: "Sarah Mann" }],
  openGraph: {
    title: "Sarah Mann — Klare Führung, volle Liebe",
    description:
      "Liebevoll erziehen, ohne dich selbst zu verlieren. Der Weg, der Wärme und Klarheit verbindet.",
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
