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
  position = "center 18%",
}: {
  src?: string;
  alt?: string;
  /** Nur setzen, wenn der Standardwert einen Kopf anschneidet. */
  position?: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-full bg-cream-dark" style={{ height: "clamp(19rem, 50vw, 44rem)" }}>
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: position }}
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
  position = "center 42%",
}: {
  src?: string;
  alt?: string;
  hoehe?: string;
  /** Testfotos sind breiter beschnitten, dort muss der Ausschnitt hoeher sitzen. */
  position?: string;
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
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}

/** Schmales Band als Auftakt eines Silos auf der Wissen-Uebersicht. */
export function SiloBand({
  src,
  alt,
  titel,
  position = "center 48%",
}: {
  src?: string;
  alt?: string;
  titel: string;
  /** Bildausschnitt je Foto. Bei zwei Motiven sitzt der Kopf so weit oben,
   *  dass der Standardwert ihn anschneidet. */
  position?: string;
}) {
  if (!src) return null;
  return (
    /* Das Band war mit hoechstens 288px viel zu flach: bei voller Breite ergab
       das ein Verhaeltnis von fast 7:1 und schnitt mitten durch die Personen.
       Jetzt rund 3:1, damit die Szene erkennbar bleibt. Der dunkle Verlauf ist
       raus, er lag ohne Text darueber nur als Schleier auf den warmen Fotos. */
    <div
      className="relative w-full overflow-hidden mb-12"
      style={{ height: "clamp(15rem, 38vw, 36rem)" }}
    >
      <Image
        src={src}
        alt={alt ?? titel}
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}
