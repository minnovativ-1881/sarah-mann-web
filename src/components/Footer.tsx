import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-midnight text-cream/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="py-16 grid md:grid-cols-4 gap-12 border-b border-cream/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col leading-none mb-5 group">
              <span className="font-serif text-2xl font-medium text-cream group-hover:text-stone transition-colors">
                Sarah Mann
              </span>
              <span className="text-overline text-stone mt-1">
                Balanced Parenting
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-light">
              Pädagogin. Babyschlafberaterin. Mutter von sieben Kindern.
              Die führende deutschsprachige Expertin für Balanced Parenting.
            </p>
            <p className="font-serif italic text-stone/80 text-sm mt-4">
              „Warm genug, um zu lieben. Klar genug, um zu führen."
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-overline text-cream/30 mb-5">Navigation</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Balanced Parenting", href: "/balanced-parenting/" },
                { label: "Über Sarah", href: "/ueber-sarah/" },
                { label: "Bücher", href: "/buch/" },
                { label: "Kontakt", href: "/kontakt/" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/50 hover:text-cream transition-colors link-underline font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-overline text-cream/30 mb-5">Kontakt</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hallo@sarahmann.de"
                  className="text-cream/50 hover:text-stone transition-colors link-underline font-light"
                >
                  hallo@sarahmann.de
                </a>
              </li>
              <li>
                <Link
                  href="/kontakt/"
                  className="text-cream/50 hover:text-cream transition-colors link-underline font-light"
                >
                  Anfrage stellen
                </Link>
              </li>
              <li className="mt-5">
                <p className="text-cream/30 text-xs leading-relaxed font-light">
                  Für Vorträge, Workshops,
                  <br />
                  Medienanfragen & Beratung
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="font-light">© {new Date().getFullYear()} Sarah Mann. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link
              href="/impressum/"
              className="text-cream/40 hover:text-cream transition-colors font-light"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz/"
              className="text-cream/40 hover:text-cream transition-colors font-light"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
