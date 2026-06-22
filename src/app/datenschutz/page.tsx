import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Datenschutz | Sarah Mann" };

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="section-padding bg-cream pt-40">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <h1 className="heading-section text-deep mb-10" style={{ fontSize: "2.5rem" }}>Datenschutz</h1>
          <div className="space-y-6 text-deep/70 text-sm leading-relaxed">
            <p>
              Diese Website erhebt keine personenbezogenen Daten und verwendet
              keine Cookies. Das Kontaktformular sendet Anfragen direkt per
              E-Mail-Client ohne serverseitige Speicherung.
            </p>
            <p>
              Hosting: Vercel Inc., San Francisco, CA, USA.<br />
              Technisch notwendige Serverprotokolle werden von Vercel für
              maximal 30 Tage gespeichert.
            </p>
            <p>Verantwortliche: Sarah Mann, hallo@sarahmann.de</p>
            <div className="pt-4 text-deep/40 text-xs">
              <p>Vollständige Datenschutzerklärung vor Go-Live ergänzen.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
