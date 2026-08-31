import Image from "next/image";

/**
 * Bilder fuer Artikel, Silos und Tests.
 *
 * Alle drei Komponenten sind bewusst so gebaut, dass sie ohne Bild einfach
 * nichts rendern. So bleibt die Seite vollstaendig funktionsfaehig, solange
 * die Fotos noch nicht geliefert sind, und wird Stueck fuer Stueck reicher,
 * sobald Dateien dazukommen.
 *
 * Konvention fuer die Dateien:
 *   Artikel  ->  /bilder/artikel/<slug>.webp     (3:2, 1600x1067)
 *   Silo     ->  /bilder/silos/<silo>.webp       (16:9, 1920x1080)
 *   Test     ->  /bilder/tests/<slug>.webp       (3:2, 1200x800)
 */

/** Breites Band unter dem Artikel-Header. */
export function ArtikelHeroBild({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-full bg-cream-dark" style={{ height: "clamp(18rem, 42vw, 34rem)" }}>
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />
      {/* Sehr dezent, damit der Uebergang zur Textspalte nicht hart bricht */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%)" }}
      />
    </div>
  );
}

/** Vorschaubild in einer Artikel- oder Testkachel. */
export function KachelBild({
  src,
  alt,
  hoehe = "12rem",
}: {
  src?: string;
  alt?: string;
  hoehe?: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-full overflow-hidden bg-cream-mid" style={{ height: hoehe }}>
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="transition-transform duration-700 group-hover:scale-105"
        style={{ objectFit: "cover", objectPosition: "center 42%" }}
      />
    </div>
  );
}

/** Schmales Band als Auftakt eines Silos auf der Wissen-Uebersicht. */
export function SiloBand({
  src,
  alt,
  titel,
}: {
  src?: string;
  alt?: string;
  titel: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-full overflow-hidden mb-12" style={{ height: "clamp(11rem, 22vw, 18rem)" }}>
      <Image
        src={src}
        alt={alt ?? titel}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(12,58,64,0.78) 0%, rgba(12,58,64,0.42) 60%, rgba(12,58,64,0.18) 100%)",
        }}
      />
    </div>
  );
}
