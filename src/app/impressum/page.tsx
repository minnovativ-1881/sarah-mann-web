import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum | Sarah Mann",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pt-40 pb-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="heading-section text-deep mb-12" style={{ fontSize: "2.75rem" }}>
            Impressum
          </h1>

          <div className="space-y-2 text-deep/80 leading-relaxed">
            <h2 className="font-serif text-deep text-2xl mt-2 mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Sarah + Timon Mann
              <br />
              Rechov HaReem 16
              <br />
              9090230 Israel
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              Vertreten durch
            </h2>
            <p>Sarah Mann</p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">Kontakt</h2>
            <p>
              Telefon: +49 (0)1567 8472684
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@sarahmann.de"
                className="text-terra hover:underline"
              >
                hallo@sarahmann.de
              </a>
            </p>

            <h2 className="font-serif text-deep text-2xl mt-10 mb-3">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>
              Sarah Mann
              <br />
              Anschrift wie oben
            </p>

            <h2 className="font-serif text-deep text-2xl mt-12 mb-3">
              Haftungsausschluss
            </h2>

            <h3 className="font-medium text-deep mt-6 mb-2">Haftung für Inhalte</h3>
            <p className="text-sm text-deep/75">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
              wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
              den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
              wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
              oder gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
              von Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>

            <h3 className="font-medium text-deep mt-6 mb-2">Haftung für Links</h3>
            <p className="text-sm text-deep/75">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
              der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
              zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
              erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
              Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
              nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>

            <h3 className="font-medium text-deep mt-6 mb-2">Urheberrecht</h3>
            <p className="text-sm text-deep/75">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
