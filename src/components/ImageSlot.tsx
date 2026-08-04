import Image from "next/image";

/**
 * Bild-Slot fuer die Seite. Solange kein `src` gesetzt ist, wird ein
 * markenkonformer Platzhalter mit Motiv-Label angezeigt. Sobald ein
 * generiertes Bild vorliegt, einfach `src` setzen (z.B. "/bilder/hero.webp").
 */
export default function ImageSlot({
  src,
  alt,
  label,
  aspect = "4/5",
  priority = false,
  rounded = false,
  position = "center",
}: {
  src?: string;
  alt: string;
  label?: string;
  aspect?: string;
  priority?: boolean;
  rounded?: boolean;
  position?: string;
}) {
  const radius = rounded ? "0.25rem" : "0";

  if (src) {
    return (
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: aspect, borderRadius: radius }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: position }}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden w-full flex items-center justify-center"
      style={{
        aspectRatio: aspect,
        borderRadius: radius,
        background: "linear-gradient(160deg, #F6F4EF 0%, #E7E4DE 100%)",
      }}
      role="img"
      aria-label={alt}
    >
      <div className="text-center px-8">
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-5"
          style={{ opacity: 0.35 }}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="1" stroke="#136B73" strokeWidth="1" />
          <circle cx="8.5" cy="8.5" r="1.6" stroke="#136B73" strokeWidth="1" />
          <path d="M21 15.5l-5-5L5 21" stroke="#136B73" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        {label && (
          <p className="text-overline text-terra" style={{ opacity: 0.7 }}>
            {label}
          </p>
        )}
        <p className="text-deep/40 text-xs mt-2 tracking-wide">Bild folgt</p>
      </div>
    </div>
  );
}
