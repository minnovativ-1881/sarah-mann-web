import Link from "next/link";
import { KachelBild } from "@/components/ArtikelBild";
import { SILOS, artikelUrl, type Artikel } from "@/lib/artikel";
import { testNachSlug, testUrl } from "@/lib/tests";

/* ---------------------------- Inhaltsverzeichnis --------------------------- */

export function Inhaltsverzeichnis({
  punkte,
}: {
  punkte: { id: string; text: string }[];
}) {
  if (punkte.length < 3) return null;
  return (
    <nav className="bg-cream-dark p-7 lg:p-8 my-10" aria-label="Inhalt">
      <p className="text-overline text-terra mb-5">Worum es geht</p>
      <ol className="space-y-3">
        {punkte.map((p, i) => (
          <li key={p.id} className="flex gap-4">
            <span className="font-serif text-stone/70 flex-shrink-0" style={{ minWidth: "1.4rem" }}>
              {i + 1}
            </span>
            <a
              href={`#${p.id}`}
              className="text-deep/75 hover:text-terra transition-colors leading-snug"
            >
              {p.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------- FAQ ------------------------------------ */

export function FaqBlock({
  faq,
}: {
  faq: { frage: string; antwort: string }[];
}) {
  if (!faq?.length) return null;
  return (
    <section className="mt-16 pt-12 border-t-2 border-terra">
      <p className="text-overline text-terra mb-6">Häufige Fragen</p>
      <div className="space-y-8">
        {faq.map((f) => (
          <div key={f.frage}>
            <h3 className="font-serif text-deep text-xl lg:text-2xl mb-3">{f.frage}</h3>
            <p className="text-deep/80 leading-relaxed" style={{ fontSize: "1.08rem" }}>
              {f.antwort}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Test-Hinweis ------------------------------ */

export function TestHinweis({ slug }: { slug: string }) {
  const test = testNachSlug(slug);
  if (!test) return null;
  return (
    <aside className="my-12 bg-cream-dark border-l-2 border-terra p-8 lg:p-10">
      <p className="text-overline text-terra mb-3">{test.eyebrow}</p>
      <h3 className="font-serif text-deep text-2xl lg:text-3xl mb-4">{test.titel}</h3>
      <p className="text-deep/80 leading-relaxed mb-7 max-w-xl">{test.intro}</p>
      <Link href={testUrl(test.slug)} className="btn-primary">
        Test starten, {test.dauer}
      </Link>
    </aside>
  );
}

/* ---------------------------- Verwandte Artikel --------------------------- */

export function VerwandteArtikel({ artikel }: { artikel: Artikel[] }) {
  if (!artikel.length) return null;
  return (
    <section className="bg-cream-dark section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-overline text-terra mb-8">Weiterlesen</p>
        <div className="grid md:grid-cols-3 gap-6">
          {artikel.map((a) => (
            <Link
              key={a.slug}
              href={artikelUrl(a.slug)}
              className="kachel group flex flex-col"
            >
              <KachelBild src={a.bild} alt={a.bildAlt} hoehe="10rem" />
              <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
                <p className="text-overline text-terra/70 mb-4">{SILOS[a.silo].name}</p>
                <h3 className="font-serif text-deep text-xl lg:text-2xl leading-snug mb-3 group-hover:text-terra transition-colors">
                  {a.titel}
                </h3>
                <p className="text-deep/65 text-sm leading-relaxed">{a.beschreibung}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Autorin --------------------------------- */

export function AutorinBox() {
  return (
    <aside className="mt-14 pt-10 border-t border-cream-mid flex flex-col sm:flex-row gap-7 items-start">
      <div
        className="flex-shrink-0 bg-cream-dark"
        style={{ width: "5.5rem", height: "5.5rem", borderRadius: "50%", overflow: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bilder/sarah.webp"
          alt="Sarah Mann"
          width={110}
          height={110}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <p className="text-overline text-terra mb-2">Geschrieben von</p>
        <p className="font-serif text-deep text-xl mb-2">Sarah Mann</p>
        <p className="text-deep/75 leading-relaxed text-sm max-w-lg">
          Pädagogin, zertifizierte Babyschlafberaterin und Mutter von sieben
          Kindern. Sie zeigt Eltern einen Weg, der Wärme und Klarheit verbindet,
          statt sich zwischen beidem entscheiden zu müssen.
        </p>
        <Link
          href="/ueber-sarah/"
          className="text-terra text-sm underline underline-offset-4 hover:text-terra-light mt-3 inline-block"
        >
          Mehr über Sarah
        </Link>
      </div>
    </aside>
  );
}

/* ------------------------------ Brotkrumen -------------------------------- */

export function Brotkrumen({
  punkte,
}: {
  punkte: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Brotkrumen" className="flex flex-wrap items-center gap-2 text-xs tracking-wide">
      {punkte.map((p, i) => (
        <span key={i} className="flex items-center gap-2">
          {p.href ? (
            <Link href={p.href} className="text-deep/50 hover:text-terra transition-colors">
              {p.label}
            </Link>
          ) : (
            <span className="text-deep/70">{p.label}</span>
          )}
          {i < punkte.length - 1 && <span className="text-cream-mid">/</span>}
        </span>
      ))}
    </nav>
  );
}
