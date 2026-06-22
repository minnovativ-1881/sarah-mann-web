"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 150);
  }, []);

  return (
    <section className="relative min-h-screen bg-cream flex items-center overflow-hidden">
      {/* Subtle warm gradient in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 100%, rgba(196,122,90,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div>
            <p className="text-overline text-terra mb-6 tracking-widest">
              Balanced Parenting &middot; Expertin &amp; Autorin
            </p>

            <h1
              ref={headlineRef}
              className="heading-display text-deep"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Wer liebt,
              <br />
              <em className="text-terra not-italic">f&uuml;hrt.</em>
            </h1>

            <div className="divider-terra mt-8" />

            <p className="text-deep/65 text-lg leading-relaxed mt-6 max-w-lg font-light">
              Sarah Mann ist die f&uuml;hrende deutschsprachige Expertin
              f&uuml;r{" "}
              <span className="text-deep font-medium">Balanced Parenting</span>{" "}
              &mdash; den Weg zwischen Ersch&ouml;pfung und Entfremdung.
              P&auml;dagogin. Babyschlafberaterin. Mutter von sieben Kindern.
            </p>

            <p className="text-deep/40 text-base leading-relaxed mt-4 max-w-lg font-light italic font-serif">
              &bdquo;Warm genug, um zu lieben. Klar genug, um zu f&uuml;hren.&ldquo;
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/buch/" className="btn-primary">
                Das Buch entdecken
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/kontakt/" className="btn-outline btn-outline-dark">
                Anfrage stellen
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-deep/10">
              {[
                { num: "15+", label: "Jahre Erfahrung" },
                { num: "7", label: "eigene Kinder" },
                { num: "1.000+", label: "Familien begleitet" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-terra" style={{ fontSize: "2rem", lineHeight: 1, fontWeight: 300 }}>
                    {stat.num}
                  </div>
                  <div className="text-deep/45 text-xs mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative" style={{ maxWidth: "460px", width: "100%" }}>
              {/* Terra accent frame behind photo */}
              <div
                className="absolute rounded-sm"
                style={{
                  inset: 0,
                  transform: "translate(14px, 14px)",
                  background: "rgba(196,122,90,0.12)",
                  border: "1px solid rgba(196,122,90,0.3)",
                }}
              />
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <Image
                  src="/sarah-mann.png"
                  alt="Sarah Mann, Expertin fuer Balanced Parenting"
                  width={460}
                  height={560}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              {/* Caption below photo */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-terra/20" />
                <p className="text-deep/40 text-xs tracking-widest uppercase">
                  Sarah Mann
                </p>
                <div className="h-px flex-1 bg-terra/20" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-deep/25">
        <span className="text-overline" style={{ fontSize: "0.6rem" }}>
          Entdecken
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-deep/25 to-transparent" />
      </div>
    </section>
  );
}
