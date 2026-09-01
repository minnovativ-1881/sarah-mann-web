import Link from "next/link";
import Image from "next/image";
import { SILOS, siloUrl, type SiloSlug } from "@/lib/artikel";

export default function Footer() {
  const silos = Object.keys(SILOS) as SiloSlug[];

  return (
    <footer className="bg-midnight text-cream/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-cream/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6 group" aria-label="Sarah Mann, zur Startseite">
              <Image
                src="/bilder/logo-full-light.webp"
                alt="Sarah Mann — Klare Führung, volle Liebe"
                width={740}
                height={268}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-normal">
              Pädagogin. Babyschlafberaterin. Mutter von sieben Kindern.
              Erziehung mit klarer Führung und voller Liebe.
            </p>
          </div>

          {/* Themen */}
          <div>
            <p className="text-overline text-cream/30 mb-5">Themen</p>
            <ul className="space-y-3 text-sm">
              {silos.map((s) => (
                <li key={s}>
                  <Link
                    href={siloUrl(s)}
                    className="text-cream/50 hover:text-cream transition-colors link-underline font-normal"
                  >
                    {SILOS[s].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <p className="text-overline text-cream/30 mb-5">Navigation</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Wissen", href: "/wissen/" },
                { label: "Tests", href: "/tests/" },
                { label: "Das Konzept", href: "/balanced-parenting/" },
                { label: "Über Sarah", href: "/ueber-sarah/" },
                { label: "Kontakt", href: "/#kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/50 hover:text-cream transition-colors link-underline font-normal"
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
                  className="text-cream/50 hover:text-stone transition-colors link-underline font-normal"
                >
                  hallo@sarahmann.de
                </a>
              </li>
              <li>
                <Link
                  href="/#kontakt"
                  className="text-cream/50 hover:text-cream transition-colors link-underline font-normal"
                >
                  Anfrage stellen
                </Link>
              </li>
              <li className="mt-5">
                <p className="text-cream/30 text-xs leading-relaxed font-normal">
                  Für Medien, Podcasts
                  <br />
                  und Presse
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="font-normal">© {new Date().getFullYear()} Sarah Mann. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link
              href="/impressum/"
              className="text-cream/40 hover:text-cream transition-colors font-normal"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz/"
              className="text-cream/40 hover:text-cream transition-colors font-normal"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
