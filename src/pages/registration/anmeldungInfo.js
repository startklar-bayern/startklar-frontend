import React from "react";
import {Container, Row, Col, Alert}  from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle, faArrowRight} from '@fortawesome/free-solid-svg-icons'

export default class AnmeldungInfo extends React.Component {
  render() {
    return (
        <div className="anmeldungInfo">
            <Container>
              <Row className="my-4">
                <Col>
                  <h1>Anmeldung Info</h1>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <h3>1. Bildet eine Gruppe</h3>
                  <p>Bei STARTKLAR gibt es nur Gruppenanmeldungen. Eine Gruppe kann dein Freundeskreis, deine Kolpingsfamilie oder sogar dein Diözesanverband sein. Wenn du niemanden für eine Gruppe findest, kannst du auch eine Gruppe mit nur einer Person anmelden.</p>

                  <h3>2. Bestimmt eine*n Gruppenleiter*IN</h3>
                  <p>Diese*r ist für die Gruppe verantwortlich und meldet euch gesammelt über die STARTKLAR Website an. Außerdem kümmert er*sie sich auch um die Einhaltung des Schutzkonzepts, nimmt an der Einweisung dazu teil und ist Ansprechpartner*in für Rückfragen.Der*die Gruppenleiter*in muss mindestens 18 Jahre alt sein.</p>

                  <h3>3. SAMMLE DIE DATEN DEINER GRUPPEN-TEILNEHMER*INNEN</h3>
                  <p>Für die Anmeldung brauchen wir von <b>allen</b> Teilnehmer*innen folgende Daten, die du im Voraus von allen abfragen solltest:</p>
                  <ul>
                    <li>Name</li>
                    <li>Vorname</li>
                    <li>Geburtsdatum</li>
                    <li>Adresse</li>
                    <li>Telefon</li>
                    <li>E-Mail</li>
                    <li>Telefon Erziehungsberechtigte Person (Wenn nicht volljährig)</li>
                    <li>E-Mail Erziehungsberechtigte Person (Wenn nicht volljährig)</li>
                    <li>Geschlecht</li>
                    <li>T-Shirt Größe (XS, S, M, L, XL, XXL, XXXL)</li>
                    <li>Anreise (Datum + ungefähre Uhrzeit)</li>
                    <li>Abreise (Datum + ungefähre Uhrzeit)</li>
                    <li>Krankheiten / Allergien / Medikamente</li>
                    <li>Corona-Impfstatus- Essensgewohnheiten (vegetarisch / vegan / Allergien / Unverträglichkeiten)</li>
                    <li>Geschwister (für Geschwister-Rabatt)</li>
                  </ul>

                  <p>Achte darauf dass du die Einwilligung aller Teilnehmer*innen hast, ihre Daten an uns weiterzugeben: Frag also jede*n um Erlaubnis.</p>
                  <p>
                    Hier kannst du einen Anmeldebogen für deine Teilnehmer*innen als Vorlage herunterladen. <b>Diesen musst du NICHT zwingend verwenden und auch nicht an uns schicken.</b>
                    Er ist nur als Hilfe für dich gedacht. Die Daten müssen direkt über das Formular auf der Website eingegeben werden.
                  </p>

                  <h3>4. BESTIMME AUFSICHTSPERSONEN</h3>
                  <p>
                    Alle Teilnehmer*innen unter 18 Jahren benötigen eine volljährige Aufsichtsperson aus eurer Gruppe. Eine Aufsichtsperson kann die Aufsicht für <b>maximal 10 Teilnehmer*innen</b> übernehmen.
                    Die Aufsichtspersonen sollten entsprechend dem Geschlecht der Teilnehmer*innen zugeordnet werden.
                  </p>
                  <p>
                    Du brauchst von jeder Aufsichtsperson, und von dir selbst, eine <b>Bestätigung über ein einwandfreies Führungszeugnis</b>, die bis zum 11. Juni 2023 gültig ist, als Foto oder PDF.
                  </p>
                  <p>
                    Diese Bestätigung solltet ihr sowieso schon haben, wenn ihr bei euch vor Ort in der Jugendarbeit aktiv seid. Falls nicht, wendet euch an eure Kolpingsfamilie oder euren Diözesanverband, die können euch weiterhelfen.
                  </p>
                  <p>
                    Weitere Infos dazu findet ihr auch in unserem Schutzkonzept.
                  </p>

                  <h3>5. MELDE DEINE GRUPPE AN</h3>
                  <p>
                    Wenn du alle Daten erfasst hast, kannst du deine Gruppe über den Link unten auf dieser Seite anmelden.<br></br>
                    Trage alle erfassten Daten online ein. Du kannst jederzeit zwischenspeichern und die Anmeldung zu einem späteren Zeitpunkt fortsetzen.
                  </p>
                  <p>
                    Danach bekommst du eine Anmeldebestätigung per E-Mail.
                  </p>
                  <p>
                    Du kannst im Nachhinein bis zum Anmeldeschluss am 16.04.2023 die Daten deiner Teilnehmer*innen online bearbeiten, weitere Personen hinzufügen oder bestehende Personen entfernen.
                  </p>

                  <h3>6. Überweise die TeilnAHMEGEBÜHR</h3>
                  <p>
                    Nach dem 16.04.2023 erhältst du eine Rechnung für die Teilnahmegebühren der kompletten Gruppe per E-Mail.
                  </p>
                  <p>
                    Diese musst du <b>innerhalb von 2 Wochen</b> überweisen, <b>ansonsten gilt deine Anmeldung nicht als bestätigt!</b>
                  </p>

                  <h3>7. IHR SEID STARTKLAR!</h3>
                  <p>
                    Alles ist erledigt. Wir sehen uns auf dem Jugendfestival und verbringen zusammen eine unvergessliche Zeit.
                  </p>

                  <hr/>

                  <div className="text-center my-4">
                    <h2>Anmeldung</h2>
                    <p>Hast du die Daten aller Teilnehmer*innen deiner Gruppe beisammen und bist startklar für die Anmeldung? Dann geht's jetzt los!</p>
                    <a href="/anmeldung-gruppe">
                      <button className="btn btn-primary">Zur Anmeldung <FontAwesomeIcon icon={faArrowRight}/></button>
                    </a>
                  </div>

                </Col>
                <Col lg={4}>
                  <Alert bsStyle="info">
                    <Row>
                    <Col xs={2}>
                        <FontAwesomeIcon size="2x" icon={faQuestionCircle}/>
                      </Col>
                      <Col xs={10}>
                        <h3>HAST DU NOCH Fragen zur Anmeldung?</h3>
                        <p>Dann wende dich per E-Mail an <a href="mailto:anmeldung@startklar.bayern">anmeldung@startklar.bayern</a> oder telefonisch ans Jugendbüro unter <a href="tel:08959996930">089 / 59 99 69 - 30</a> </p>
                      </Col>
                    </Row>
                  </Alert>
                </Col>
              </Row>
            </Container>
        </div>
    )
  }
}
