import Link from "next/link";
import type { Test, Ergebnis } from "@/lib/tests";

/**
 * Stellt ein Testergebnis dar.
 *
 * Wird an drei Stellen gebraucht und muss überall gleich aussehen: direkt nach
 * dem Test, auf der Bestätigungsseite und auf der Seite nach der Bestätigung.
 * Deshalb liegt es hier und nicht in TestEngine.
 */
export default function ErgebnisAnzeige({
  test,
  ergebnis,
  punkte,
  vorname,
  eyebrow,
}: {
  test: Test;
  ergebnis: Ergebnis;
  punkte?: Record<string, number>;
  vorname?: string;
  eyebrow?: string;
}) {
  const zeigePunkte =
    punkte && test.art === "matrix" && test.achsen && test.achsen.length > 0;

  return (
    <div>
      <p className="text-overline text-terra mb-5">
        {eyebrow ?? (vorname ? `${vorname}, dein Ergebnis` : "Dein Ergebnis")}
      </p>
      <h2
        className="font-serif text-deep"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}
      >
        {ergebnis.name}
      </h2>
      {ergebnis.unter && (
        <p className="font-serif italic text-terra text-lg lg:text-xl mt-3">
          {ergebnis.unter}
        </p>
      )}
      <div className="divider-terra" />

      {zeigePunkte && (
        <div className="flex flex-wrap gap-8 mt-7 mb-8">
          {test.achsen.map((a) => (
            <div key={a.key}>
              <p className="text-overline text-terra/70 mb-2">{a.name}</p>
              <p className="font-serif text-deep text-2xl">
                {punkte![a.key] ?? 0}
                <span className="text-deep/40 text-base"> von {a.max}</span>
              </p>
              <div className="h-1 bg-cream-mid mt-2" style={{ width: "9rem" }}>
                <div
                  className="h-1 bg-terra"
                  style={{
                    width: `${Math.round(((punkte![a.key] ?? 0) / a.max) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p
        className={`text-deep/80 leading-relaxed max-w-2xl ${zeigePunkte ? "" : "mt-7"}`}
        style={{ fontSize: "1.1rem" }}
      >
        {ergebnis.text}
      </p>

      {ergebnis.schritte && ergebnis.schritte.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <p className="text-overline text-terra mb-4">Was jetzt konkret hilft</p>
          <ul className="space-y-3">
            {ergebnis.schritte.map((s, i) => (
              <li key={i} className="flex gap-4 text-deep/80 leading-relaxed">
                <span
                  className="font-serif text-stone flex-shrink-0"
                  style={{ fontSize: "1.4rem", lineHeight: 1.2 }}
                >
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {test.artikel && (
        <div className="mt-10">
          <Link href={`/wissen/${test.artikel}/`} className="btn-outline btn-outline-dark">
            Mehr dazu lesen
          </Link>
        </div>
      )}
    </div>
  );
}
