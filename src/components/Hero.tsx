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
      {/* Whisper of warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 94% 4%, rgba(19,107,115,0.24) 0%, transparent 56%), radial-gradient(ellipse 90% 72% at 66% 110%, rgba(19,107,115,0.15) 0%, transparent 64%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-24 items-center">

          {/* Left: Text */}
          <div>
            <p className="text-overline text-terra mb-8">
              Sarah Mann &middot; P&auml;dagogin und Mutter von sieben
            </p>

            <h1
              ref={headlineRef}
              className="heading-display text-deep"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
            >
              Liebevoll erziehen,
              <br />
              ohne dich selbst
              <br />
              zu <em className="text-terra italic">verlieren.</em>
            </h1>

            <div className="divider-terra mt-10" />

            <p className="body-text text-deep/80 mt-8 max-w-lg">
              Du gibst alles f&uuml;r dein Kind und f&uuml;hlst dich trotzdem oft
              ersch&ouml;pft, unsicher, zerrissen. Sarah Mann zeigt dir einen Weg,
              der beides verbindet: die W&auml;rme, die dein Kind braucht, und die
              Klarheit, die euch beiden Halt gibt.
            </p>

            <p className="text-terra text-base leading-relaxed mt-5 max-w-lg font-serif italic">
              Klare F&uuml;hrung, volle Liebe.
            </p>

            <div className="flex flex-wrap gap-4 mt-12">
              <Link href="/quiz/" className="btn-primary">
                Mach den Test
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/balanced-parenting/" className="btn-outline btn-outline-dark">
                Sarahs Weg
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 sm:gap-12 mt-16 pt-10 border-t border-deep/10">
              {[
                { num: "15+", label: "Jahre Erfahrung" },
                { num: "7", label: "eigene Kinder" },
                { num: "1.000+", label: "Familien begleitet" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-terra" style={{ fontSize: "2.25rem", lineHeight: 1, fontWeight: 300 }}>
                    {stat.num}
                  </div>
                  <div className="text-deep/62 text-xs mt-2 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex justify-center md:justify-end">
            <div style={{ maxWidth: "460px", width: "100%" }}>
              <Image
                src="/sarah-mann.png"
                alt="Sarah Mann, Pädagogin und Mutter von sieben Kindern"
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
