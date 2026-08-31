"use client";
import { useSearchParams } from "next/navigation";
import ErgebnisAnzeige from "@/components/ErgebnisAnzeige";
import { TESTS } from "@/lib/tests";

/**
 * Liest Test und Ergebnis aus der URL und stellt die Auswertung dar.
 *
 * Wird auf der Bestätigungsseite und auf der Seite nach der Bestätigung
 * gebraucht. Fehlt oder stimmt ein Parameter nicht, wird nichts gerendert
 * statt einer Fehlermeldung: die Seite soll auch dann sinnvoll bleiben, wenn
 * jemand sie ohne Parameter aufruft.
 */
export default function ErgebnisAusUrl({ eyebrow }: { eyebrow?: string }) {
  const params = useSearchParams();
  const testSlug = params.get("test");
  const typ = params.get("typ");
  const name = params.get("name");

  if (!testSlug || !typ) return null;

  const test = TESTS.find((t) => t.slug === testSlug);
  if (!test) return null;

  const ergebnis = test.ergebnisse.find((e) => e.key === typ);
  if (!ergebnis) return null;

  // Mit Vorname wird die Zeile persoenlich, sonst bleibt der uebergebene Text.
  const zeile = name && eyebrow ? `${name}, ${eyebrow.charAt(0).toLowerCase()}${eyebrow.slice(1)}` : eyebrow;

  return (
    <div className="bg-cream border-2 border-terra p-8 lg:p-12" style={{ boxShadow: "0 24px 60px rgba(19,107,115,0.14)" }}>
      <ErgebnisAnzeige
        test={test}
        ergebnis={ergebnis}
        vorname={name ?? undefined}
        eyebrow={zeile}
      />
    </div>
  );
}

/** Nur der Testname, für Überschriften. */
export function TestName() {
  const params = useSearchParams();
  const test = TESTS.find((t) => t.slug === params.get("test"));
  return <>{test ? test.titel : "dein Test"}</>;
}

/** Vorname aus der URL, für die persönliche Anrede. */
export function Vorname({ fallback = "" }: { fallback?: string }) {
  const params = useSearchParams();
  const name = params.get("name");
  return <>{name ? name : fallback}</>;
}
