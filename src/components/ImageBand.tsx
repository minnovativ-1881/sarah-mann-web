import Image from "next/image";

/**
 * Vollbreites Bild-Band als Abschnitts-Trenner.
 * Optional mit Marken-Statement (quote) links auf dunklem Verlauf.
 */
export default function ImageBand({
  src,
  alt,
  position = "center 30%",
  quote,
  height = "56vh",
}: {
  src: string;
  alt: string;
  position?: string;
  quote?: string;
  height?: string;
}) {
  return (
    <section className="relative bg-cream">
      <div
        className="relative w-full overflow-hidden"
        style={{ height, minHeight: "340px" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: position }}
        />
        {quote && (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(12,58,64,0.64) 0%, rgba(12,58,64,0.22) 42%, rgba(12,58,64,0) 68%)",
              }}
            />
            <div className="relative h-full max-w-6xl mx-auto px-6 lg:px-12 flex items-center">
              <div className="max-w-md">
                <p
                  className="font-serif italic text-cream leading-snug"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.7rem)" }}
                >
                  {quote}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
