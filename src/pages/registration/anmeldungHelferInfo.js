import React, {Component} from "react";
import {Helmet} from "react-helmet-async";
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {withSupportChat} from "../../hoc/withSupportChat";
import {HeaderWhite} from "../../layouts";

class AnmeldungHelferInfo extends Component {
    render() {
        return (
            <div className="anmeldungInfo">
                <Helmet>
                    <title>Helfer*innen-Anmeldung | STARTKLAR</title>
                </Helmet>

                <HeaderWhite />

                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Helfer*innen-Anmeldung</h1>
                        </Col>
                    </Row>
                    <Row className="anmeldung-info-row px-0">
                        <Col className="field-object p-4 fs-6">
                            <p>Einfach nur Teilnehmer*in sein ist dir zu langweilig? Du bist tatkräftig und möchtest mit
                                anpacken?</p>
                            <p><strong>Dann melde dich als Helfer*in an!</strong></p>
                            <p>Als Helfer*in kannst du dich für verschiedene Arbeiten, die auf dem Jugendfestival
                                anfallen, melden. Es kann aber auch sein dass du spontan bei anderen Aufgaben gebraucht
                                wirst.</p>
                            <p>Beachte außerdem, dass du als Helfer*in <strong>mindestens 12 Stunden aktiv
                                mitarbeiten</strong> musst.</p>
                            <p>Dafür zahlst du auch nur einen <strong>ermäßigten Preis von 35€</strong>.</p>
                            <p>Alle Helfer*innen müssen am Jugendfestival <strong>mindestens 18 Jahre alt</strong> sein!
                            </p>
                            <p>Außerdem musst du eine Bestätigung über ein einwandfreies Führungszeugnis im Jugendbüro
                                vorlegen. Genaue Infos dazu erhältst du nach der Anmeldung.</p>
                            <p>Nach der Anmeldung kontaktiert dich die entsprechende AG-Leitung und gibt dir alle Infos
                                die du wissen musst.</p>
                            <p>Falls du dich schon über eine Gruppe angemeldet hast, gib bitte der*dem
                                Gruppenverantwortlichen Bescheid, dass sie dich aus der Gruppe entfernen soll.</p>
                            <p>Du kannst deine Daten bis zum <strong>Anmeldeschluss am 16. April 2023</strong> jederzeit über den Link                                aus der E-Mail bearbeiten.</p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <div className="text-center my-4">
                                <h2>Anmeldung</h2>
                                <p>Du bist STARTKLAR und voller Tatendrang und möchtest dich als Helfer*in anmelden? Dann los!</p>
                                <NavLink to="/anmeldung-helfer">
                                    <button className="btn btn-primary">Zur Anmeldung <FontAwesomeIcon
                                        icon={faArrowRight}/></button>
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withSupportChat(AnmeldungHelferInfo);