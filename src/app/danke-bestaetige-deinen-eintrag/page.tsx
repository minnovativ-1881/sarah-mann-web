import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/artikel";

export const metadata: Metadata = {
  title: "Fast geschafft: bestätige deinen Eintrag | Sarah Mann",
  description: "Dein Ergebnis wartet. Bestätige noch kurz die E-Mail.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/danke-bestaetige-deinen-eintrag/` },
};

/**
 * Bewusst ohne Menü, ohne Fußzeile, ohne Weiterlesen-Angebote.
 *
 * Wer hier ist, hat genau eine Aufgabe: die E-Mail bestätigen. Jeder weitere
 * Link auf dieser Seite kostet Bestätigungen. Und das Ergebnis steht nirgends,
 * auch nicht in Teilen: es kommt ausschließlich per E-Mail.
 */
export default function BestaetigenSeite() {
  return (
    <main className="min-h-screen bg-cream-dark flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl text-center">
        {/* Logo statt Menü, damit die Seite trotzdem zugehörig wirkt */}
        <span
          className="relative inline-block h-9 mb-16"
          style={{ aspectRatio: "708 / 171" }}
        >
          <Image
            src="/bilder/logo-nav.webp"
            alt="Sarah Mann"
            fill
            sizes="180px"
            priority
            className="object-contain"
          />
        </span>

        <p className="text-overline text-terra mb-7">Noch ein Schritt</p>

        <h1
          className="font-serif text-deep"
          style={{ fontSize: "clamp(2.3rem, 6vw, 4rem)", lineHeight: 1.06 }}
        >
          Schau bitte kurz
          <br />
          <em className="text-terra italic">in dein Postfach.</em>
        </h1>

        <div
          className="mx-auto mt-9"
          style={{ width: "3rem", height: "1px", backgroundColor: "#136B73" }}
        />

        <p
          className="text-deep/80 leading-relaxed mt-9 mx-auto"
          style={{ fontSize: "1.15rem", maxWidth: "34rem" }}
        >
          Ich habe dir gerade eine E-Mail geschickt. Klick auf den Link darin,
          dann bekommst du dein Ergebnis. Das ist gesetzlich vorgeschrieben und
          dauert zehn Sekunden.
        </p>

        <div className="mt-14 border border-cream-mid bg-cream px-7 py-6 text-left mx-auto" style={{ maxWidth: "34rem" }}>
          <p className="text-deep/75 text-sm leading-relaxed">
            <strong className="font-medium text-deep">Nichts angekommen?</strong>{" "}
            Gib der Mail zwei Minuten. Danach lohnt ein Blick in den Spam-Ordner
            und bei Gmail in den Reiter Werbung. Wenn sie dort liegt, zieh sie
            einmal in den Posteingang, dann kommen die nächsten richtig an.
          </p>
        </div>

        <p className="text-deep/40 text-xs tracking-wide mt-16">
          Sarah Mann &nbsp;·&nbsp; Klare Führung, volle Liebe
        </p>
      </div>
    </main>
  );
}
