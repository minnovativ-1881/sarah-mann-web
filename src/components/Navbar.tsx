"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Wissen", href: "/wissen/" },
  { label: "Tests", href: "/tests/" },
  { label: "Das Konzept", href: "/balanced-parenting/" },
  { label: "Über Sarah", href: "/ueber-sarah/" },
];

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Heller Text, wenn die Nav über einem dunklen Hero liegt und noch nicht gescrollt ist
  const light = overlay && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled-light" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Sarah Mann, zur Startseite"
            className="group inline-flex items-center"
          >
            <span
              className="relative inline-block h-9"
              style={{ aspectRatio: "708 / 171" }}
            >
              <Image
                src="/bilder/logo-nav.webp"
                alt="Sarah Mann"
                fill
                sizes="160px"
                priority
                className={`object-contain object-left transition-opacity duration-300 ${
                  light ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                src="/bilder/logo-nav-light.webp"
                alt=""
                aria-hidden="true"
                fill
                sizes="160px"
                priority
                className={`object-contain object-left transition-opacity duration-300 ${
                  light ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link link-underline ${
                  light ? "text-cream/85 hover:text-cream" : "text-deep/65 hover:text-deep"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Auffaellig: gefuellter Button statt Textlink, in beiden Nav-Zustaenden kontraststark */}
            <Link
              href="/tests/eltern-test/"
              className={`ml-3 inline-flex items-center px-6 py-3 text-sm tracking-wide font-medium transition-all duration-300 hover:-translate-y-px ${
                light
                  ? "bg-cream text-deep hover:bg-white"
                  : "bg-terra text-cream hover:bg-midnight"
              }`}
              style={{ boxShadow: "0 6px 20px rgba(19,107,115,0.28)" }}
            >
              Test starten
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 ${light ? "text-cream" : "text-deep"}`}
            aria-label="Menue"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px transition-transform duration-200 ${light ? "bg-cream" : "bg-deep"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px transition-opacity duration-200 ${light ? "bg-cream" : "bg-deep"} ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px transition-transform duration-200 ${light ? "bg-cream" : "bg-deep"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-deep/10 px-6 py-8">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link text-deep/70 hover:text-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tests/eltern-test/"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 text-center justify-center"
            >
              Test starten
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
