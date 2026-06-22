"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section className="relative min-h-screen bg-midnight flex items-center overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C47A5A 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #1C2D3F 0%, transparent 50%)`,
        }}
      />

      {/* Vertical line accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-terra/20 hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-overline text-terra mb-8 tracking-widest">
              Balanced Parenting · Expertin & Autorin
            </p>

            <h1
              ref={headlineRef}
              className="heading-display text-cream"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Wer liebt,
              <br />
              <em className="text-terra not-italic">führt.</em>
            </h1>

            <div className="divider-terra mt-8" />

            <p className="text-cream/70 text-lg leading-relaxed mt-8 max-w-lg font-light">
              Sarah Mann ist die führende deutschsprachige Expertin für{" "}
              <span className="text-cream font-medium">Balanced Parenting</span>{" "}
              — den Weg zwischen Erschöpfung und Entfremdung. Pädagogin.
              Babyschlafberaterin. Mutter von sieben Kindern.
            </p>

            <p className="text-cream/50 text-base leading-relaxed mt-4 max-w-lg font-light italic font-serif">
              „Warm genug, um zu lieben. Klar genug, um zu führen."
            </p>

            <div className="flex flex-wrap gap-4 mt-12">
              <Link href="/buch/" className="btn-primary">
                Das Buch entdecken
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
              <Link href="/kontakt/" className="btn-outline btn-outline-light">
                Anfrage stellen
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-10 mt-16 pt-10 border-t border-cream/10">
              {[
                { num: "15+", label: "Jahre Erfahrung" },
                { num: "7", label: "eigene Kinder" },
                { num: "1.000+", label: "Familien begleitet" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-serif text-terra"
                    style={{ fontSize: "2rem", lineHeight: 1, fontWeight: 300 }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-cream/50 text-xs mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="photo-frame" style={{ maxWidth: "420px", width: "100%" }}>
              <div
                className="bg-deep relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Placeholder until real photo */}
                <div className="absolute inset-0 bg-gradient-to-b from-deep to-midnight flex flex-col items-center justify-end p-8">
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                    {/* Elegant photo placeholder */}
                    <div className="text-center">
                      <div
                        className="w-32 h-32 rounded-full bg-terra/20 border border-terra/40 mx-auto mb-6 flex items-center justify-center"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          className="text-terra/60"
                        >
                          <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p className="text-cream/30 text-xs tracking-widest uppercase">
                        Foto Sarah Mann
                      </p>
                    </div>
                  </div>
                  {/* Bottom caption */}
                  <div className="relative z-10 text-left w-full">
                    <div className="h-px bg-terra/40 mb-4" />
                    <p className="font-serif text-cream/80 italic text-sm">
                      „Kein Nein erzeugt kein Trauma. Aber ein Kind ohne Grenzen — das erzeugt eines."
                    </p>
                    <p className="text-terra/80 text-xs mt-2 tracking-wide">
                      — Sarah Mann
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30">
        <span className="text-overline" style={{ fontSize: "0.6rem" }}>
          Entdecken
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent" />
      </div>
    </section>
  );
}
