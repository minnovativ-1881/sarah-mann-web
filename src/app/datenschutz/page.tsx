import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Sarah Mann",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pt-40 pb-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="heading-section text-deep mb-12" style={{ fontSize: "2.75rem" }}>
            Datenschutzerklärung
          </h1>

          <div className="space-y-3 text-sm text-deep/75 leading-relaxed">

            <h2 className="font-serif text-deep text-2xl mt-2 mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was
              mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
              besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können. Diese Website ist bewusst
              datensparsam aufgebaut: Sie verwendet keine Cookies, keine
              Tracking- oder Analyse-Tools und bindet keine externen Werbedienste
              ein.
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              2. Verantwortliche Stelle
            </h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              Sarah Mann
              <br />
              Rechov HaReem 16
              <br />
              9090230 Israel
              <br />
              Telefon: +49 (0)1567 8472684
              <br />
              E-Mail:{" "}
              <a href="mailto:hallo@sarahmann.de" className="text-terra hover:underline">
                hallo@sarahmann.de
              </a>
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
              Verarbeitung von personenbezogenen Daten entscheidet.
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">3. Hosting</h2>
            <p>
              Die Inhalte dieser Website werden bei der Vercel Inc., 340 S Lemon
              Ave #4133, Walnut, CA 91789, USA, gehostet. Vercel betreibt die
              technische Infrastruktur, auf der diese Website ausgeliefert wird.
              Beim Aufruf der Website erhebt Vercel automatisch technische Daten
              (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite,
              Browser-Kennung), um die Auslieferung sicherzustellen und vor
              Angriffen zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO; wir haben ein berechtigtes Interesse an einer zuverlässigen
              und sicheren Bereitstellung unserer Website. Vercel ist nach dem
              EU-US Data Privacy Framework (DPF) zertifiziert und gewährleistet
              damit ein angemessenes Datenschutzniveau. Mit Vercel besteht ein
              Vertrag über Auftragsverarbeitung (AVV). Weitere Informationen:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-terra hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              4. Datenerfassung auf dieser Website
            </h2>

            <h3 className="font-medium text-deep mt-6 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Hostinganbieter erhebt und speichert automatisch Informationen
              in sogenannten Server-Log-Dateien, die Ihr Browser automatisch
              übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
              Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
              Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung
              dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
              Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur
              technisch fehlerfreien Darstellung und Sicherheit der Website.
            </p>

            <h3 className="font-medium text-deep mt-6 mb-2">
              Kontaktaufnahme per E-Mail
            </h3>
            <p>
              Das Kontaktformular dieser Website speichert keine Daten auf einem
              Server. Es öffnet beim Absenden Ihr eigenes E-Mail-Programm, sodass
              Sie uns Ihre Anfrage direkt per E-Mail senden. Wenn Sie uns per
              E-Mail kontaktieren, werden Ihre Angaben (z. B. Name, E-Mail-Adresse
              und der Inhalt Ihrer Nachricht) zum Zweck der Bearbeitung Ihrer
              Anfrage verarbeitet und gespeichert. Diese Daten geben wir nicht
              ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
              der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
              vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
              beruht die Verarbeitung auf unserem berechtigten Interesse an der
              Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO) oder auf
              Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die Daten
              verbleiben bei uns, bis Ihre Anfrage vollständig bearbeitet ist und
              keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>

            <h3 className="font-medium text-deep mt-6 mb-2">
              Keine Cookies, kein Tracking
            </h3>
            <p>
              Diese Website setzt keine Cookies und verwendet keine Analyse-,
              Tracking- oder Reichweitenmessungs-Dienste. Es findet keine
              Auswertung Ihres Surfverhaltens statt.
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              5. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
              und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht
              auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO),
              Einschränkung der Verarbeitung (Art. 18 DSGVO) und
              Datenübertragbarkeit (Art. 20 DSGVO). Sie können einer Verarbeitung,
              die auf Art. 6 Abs. 1 lit. f DSGVO beruht, jederzeit widersprechen
              (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit
              Wirkung für die Zukunft widerrufen. Hierzu sowie zu weiteren Fragen
              zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
            <p>
              Ihnen steht zudem ein Beschwerderecht bei der zuständigen
              Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              6. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://" auf
              „https://" wechselt. Bei aktiver Verschlüsselung können die Daten,
              die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
