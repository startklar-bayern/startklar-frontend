import React from "react";
import {Container, Row, Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {withSupportChat} from "../../hoc/withSupportChat";
import '../../assets/styles/anmeldung-info.scss';
import {Helmet} from "react-helmet-async";

class AnmeldungInfo extends React.Component {
    render() {
        return (
            <div className="anmeldungInfo gradient-reverse-container">
                <Helmet>
                    <title>Gruppen-Anmeldung | STARTKLAR</title>
                </Helmet>

                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Gruppen-Anmeldung</h1>
                            <h3>So funktionierts:</h3>
                        </Col>
                    </Row>
                    <Row className="anmeldung-info-row">
                        <Col>
                            <h3>Bildet eine Gruppe</h3>
                            <p>Bei STARTKLAR gibt es nur Gruppenanmeldungen. Eine Gruppe kann dein Freundeskreis, deine
                                Kolpingsfamilie oder sogar dein Diözesanverband sein. Wenn du niemanden für eine Gruppe
                                findest, kannst du auch eine Gruppe mit nur einer Person anmelden.</p>

                            <h3>Bestimmt eine Gruppenleitung</h3>
                            <p>Diese Person ist für die Gruppe verantwortlich und meldet euch gesammelt über die
                                STARTKLAR Website an.<br/>Außerdem kümmert er*sie sich auch um die Einhaltung des
                                Schutzkonzepts, nimmt an der Einweisung dazu teil und ist Ansprechpartner*in für
                                Rückfragen.<br/>Die Gruppenleitung muss mindestens 18 Jahre alt sein.</p>

                            <h3>Sammle die Daten deiner Gruppen-Teilnehmer*innen</h3>
                            <p>Für die Anmeldung brauchen wir von <b>allen</b> Teilnehmer*innen folgende Daten, die du
                                im Voraus von allen abfragen solltest:</p>
                            <ul>
                                <li>Name, Vorname</li>
                                <li>Geburtsdatum</li>
                                <li>Geschlecht</li>
                                <li>Adresse</li>
                                <li>Telefon und E-Mail</li>
                                <li>Telefon und E-Mail einer erziehungsberechtigten Person (wenn nicht volljährig)</li>
                                <li>T-Shirt Größe (XS, S, M, L, XL, XXL, XXXL)</li>
                                <li>Anreise (Datum + ungefähre Uhrzeit)</li>
                                <li>Abreise (Datum + ungefähre Uhrzeit)</li>
                                <li>Krankheiten / Allergien / Medikamente</li>
                                <li>Essensgewohnheiten (vegetarisch / vegan / Allergien / Unverträglichkeiten)</li>
                                <li>Geschwister (für Geschwister-Rabatt)</li>
                            </ul>

                            <p>Achte darauf, dass du die Einwilligung aller Teilnehmer*innen hast, ihre Daten an uns
                                weiterzugeben: Frag also jede*n um Erlaubnis.</p>
                            <p>
                                Hier kannst du einen Anmeldebogen für deine Teilnehmer*innen als Vorlage
                                herunterladen.<br/>
                                <b>Diesen musst du NICHT zwingend verwenden und auch nicht an uns schicken.</b><br/>
                                Er ist nur als Hilfe für dich gedacht. Die Daten müssen direkt über das Formular auf der
                                Website eingegeben werden.
                            </p>

                            <a href="/vorlage-anmeldebogen.docx" target="_blank" className="btn-primary btn-sm"><FontAwesomeIcon
                                icon="download"/> Anmeldebogen</a>

                            <h3>Bestimme Aufsichtspersonen</h3>
                            <p>
                                Alle Teilnehmer*innen unter 18 Jahren benötigen eine volljährige Aufsichtsperson aus
                                eurer Gruppe. Eine Aufsichtsperson kann die Aufsicht für <b>maximal 10
                                Teilnehmer*innen</b> übernehmen.
                                Die Aufsichtspersonen sollten entsprechend dem Geschlecht der Teilnehmer*innen
                                zugeordnet werden.
                            </p>
                            <p>
                                Weitere Infos dazu findest du auch in unserem <a href="/schutzkonzept"
                                                                                 target="_blank">Schutzkonzept</a>.
                            </p>

                            <h3>MELDE DEINE GRUPPE AN</h3>
                            <p>
                                Wenn du alle Daten erfasst hast, kannst du deine Gruppe über den Link unten auf dieser
                                Seite anmelden.<br></br>
                                Trage alle erfassten Daten online ein. Die Daten werden automatisch zwischengespeicher
                                und du kannst die Anmeldung zu einem späteren Zeitpunkt fortsetzen.
                            </p>
                            <p>
                                Danach bekommst du eine Anmeldebestätigung per E-Mail.
                            </p>
                            <p>
                                Du kannst im Nachhinein bis zum Anmeldeschluss am 16.04.2023 die Daten deiner
                                Teilnehmer*innen online bearbeiten, weitere Personen hinzufügen oder bestehende Personen
                                entfernen.
                            </p>

                            <h3>Überweise die TeilnAHMEGEBÜHR</h3>
                            <p>
                                Nach dem 16.04.2023 erhältst du eine Rechnung für die Teilnahmegebühren der kompletten
                                Gruppe per E-Mail.
                            </p>
                            <p>
                                Diese musst du <b>innerhalb von 2 Wochen</b> überweisen, <b>ansonsten gilt deine
                                Anmeldung nicht als bestätigt!</b>
                            </p>

                            <h3>IHR SEID STARTKLAR!</h3>
                            <p>
                                Alles ist erledigt. Wir sehen uns auf dem Jugendfestival und verbringen zusammen eine
                                unvergessliche Zeit.
                            </p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <div className="text-center my-4">
                                <h2>Anmeldung</h2>
                                <p>Hast du die Daten aller Teilnehmer*innen deiner Gruppe beisammen und bist startklar
                                    für die Anmeldung? Dann geht's jetzt los!</p>
                                <a href="/anmeldung-gruppe">
                                    <button className="btn btn-primary">Zur Anmeldung <FontAwesomeIcon
                                        icon={faArrowRight}/></button>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withSupportChat(AnmeldungInfo);