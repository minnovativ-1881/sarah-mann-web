import Link from "next/link";
import Image from "next/image";

const credentials = [
  { label: "Pädagogin", detail: "Wissenschaftliche Basis" },
  { label: "Babyschlafberaterin", detail: "15+ Jahre Praxis" },
  { label: "Mutter von 7", detail: "Alle Phasen aus erster Hand" },
  { label: "Autorin", detail: "Wer liebt, führt" },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Feine Haarlinie als versetzter Rahmen */}
              <div
                className="absolute inset-0 border border-terra/40"
                style={{ transform: "translate(16px, 16px)" }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  background:
                    "linear-gradient(160deg, #FBF9F5 0%, #ECE8E0 100%)",
                }}
              >
                <Image
                  src="/sarah-mann-about.png"
                  alt="Sarah Mann, Pädagogin und Mutter von sieben Kindern"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
            <p className="font-serif text-deep/70 italic text-sm leading-relaxed mt-6 max-w-sm">
              &bdquo;Mit sieben Kindern und f&uuml;nfzehn Jahren
              Beratungspraxis habe ich gelernt: Perfektion ist nicht das
              Ziel. Zuverl&auml;ssigkeit ist das Ziel.&ldquo;
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-overline text-terra mb-6">&Uuml;ber Sarah Mann</p>
            <h2
              className="heading-section text-deep"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
            >
              Die Frau hinter
              <br />
              Balanced Parenting
            </h2>
            <div className="divider-terra" />

            <div className="space-y-5 text-deep/70 leading-relaxed mt-8 font-light">
              <p>
                Sarah Mann ist P&auml;dagogin, Babyschlafberaterin und Mutter
                von sieben Kindern. Seit &uuml;ber f&uuml;nfzehn Jahren
                begleitet sie Familien in der Schlafberatung und
                Erziehungsbegleitung.
              </p>
              <p>
                Als deutschsprachige Pionierin des{" "}
                <span className="text-deep font-normal">Balanced Parenting</span>{" "}
                verbindet sie wissenschaftliche Fundierung (Baumrind, Bowlby,
                Ainsworth) mit dem echten Alltag.
              </p>
              <p>
                Sarah lebt mit ihrem Mann und ihren sieben Kindern in Israel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-cream-mid mt-10">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-cream-dark p-5">
                  <p className="text-deep font-normal text-sm">{cred.label}</p>
                  <p className="text-terra text-xs mt-1 tracking-wide">
                    {cred.detail}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/ueber-sarah/" className="btn-primary mt-10 inline-flex">
              Mehr &uuml;ber Sarah
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
