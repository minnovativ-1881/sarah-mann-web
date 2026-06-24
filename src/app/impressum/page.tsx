import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Impressum | Sarah Mann" };

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="section-padding bg-cream pt-40">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <h1 className="heading-section text-deep mb-10" style={{ fontSize: "2.5rem" }}>Impressum</h1>
          <div className="space-y-6 text-deep/70 text-sm leading-relaxed">
            <div>
              <p className="font-medium text-deep">Angaben gemäß § 5 TMG</p>
              <p className="mt-2">
                Sarah Mann<br />
                [Adresse einfügen]
              </p>
            </div>
            <div>
              <p className="font-medium text-deep">Kontakt</p>
              <p className="mt-2">
                E-Mail:{" "}
                <a href="mailto:hallo@sarahmann.de" className="text-terra hover:underline">
                  hallo@sarahmann.de
                </a>
              </p>
            </div>
            <div>
              <p className="font-medium text-deep">Verantwortlich für den Inhalt</p>
              <p className="mt-2">Sarah Mann (Anschrift wie oben)</p>
            </div>
            <div className="pt-4 text-deep/58 text-xs">
              <p>Placeholder — vollständige Angaben vor Go-Live einfügen.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
