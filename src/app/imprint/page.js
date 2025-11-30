export default function ImprintPage() {
    return (
        <section>
            <h1 className="section__title">Imprint</h1>
            <h2 className="section__subtitle">Angaben gemäß § 5 TMG</h2>
            <div className="flex flex-col space-y-8">
                <div>
                    <p>Marvin Messenzehl</p>
                    <p>c/o IP-Management #7928</p>
                    <p>Ludwig-Erhard-Str. 18</p>
                    <p>20459 Hamburg</p>
                </div>
                <div>
                    <p className="mb-2 font-medium">Kontakt:</p>
                    <p>
                        Email:{' '}
                        <a
                            href="mailto:hello@marvinmessenzehl.com"
                            className="link-basic"
                        >
                            hello@marvinmessenzehl.com
                        </a>
                    </p>
                    <p>Telefon: +4915679744983</p>
                </div>
                <div>
                    <p className="mb-2 font-medium">
                        Umsatzsteuer-Identifikationsnummer gemäß §27 a
                        Umsatzsteuergesetz:
                    </p>
                    <p>DE340186039</p>
                </div>
                <div>
                    <p className="mb-2 font-medium">
                        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                    </p>
                    <p>Marvin Messenzehl</p>
                    <p>c/o IP-Management #7928</p>
                    <p>Ludwig-Erhard-Str. 18</p>
                    <p>20459 Hamburg</p>
                </div>
                <div className="flex flex-col space-y-4">
                    <h3 className="section__subtitle">Haftungsausschluss:</h3>
                    <p>
                        Haftung für Inhalt <br /> Die Inhalte unserer Seiten
                        wurden mit größter Sorgfalt erstellt. Für die
                        Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                        können wir jedoch keine Gewähr übernehmen.
                    </p>
                    <p>
                        Haftung für Links <br />
                        Unser Angebot enthält Links zu externen Websites
                        Dritter, auf deren Inhalte wir keinen Einfluss haben.
                        Deshalb können wir für diese fremden Inhalte auch keine
                        Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
                        ist stets der jeweilige Anbieter oder Betreiber der
                        Seiten verantwortlich.
                    </p>
                    <p>
                        Urheberrecht <br />
                        Die durch die Seitenbetreiber erstellten Inhalte und
                        Werke auf diesen Seiten unterliegen dem deutschen
                        Urheberrecht. Die Vervielfältigung, Bearbeitung,
                        Verbreitung und jede Art der Verwertung außerhalb der
                        Grenzen des Urheberrechtes bedürfen der schriftlichen
                        Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                </div>
            </div>
        </section>
    )
}
