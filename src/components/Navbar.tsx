"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Balanced Parenting", href: "/balanced-parenting/" },
  { label: "Ueber Sarah", href: "/ueber-sarah/" },
  { label: "Bücher", href: "/buch/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled-light" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-medium text-deep tracking-wide group-hover:text-terra transition-colors duration-200">
              Sarah Mann
            </span>
            <span className="text-overline text-terra mt-1" style={{ fontSize: "0.6rem" }}>
              Balanced Parenting
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-deep/65 hover:text-deep link-underline"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt/"
              className="nav-link text-deep border-b border-deep/40 pb-1 hover:border-deep transition-colors ml-2"
            >
              Anfrage stellen
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-deep p-2"
            aria-label="Menue"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-deep transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-deep transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-deep transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
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
              href="/kontakt/"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 text-center justify-center"
            >
              Anfrage stellen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
