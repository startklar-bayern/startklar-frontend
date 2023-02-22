import React from "react";
import {Col, Container, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {withSupportChat} from "../../hoc/withSupportChat";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {HeaderWhite} from "../../layouts";
import {Helmet} from "react-helmet-async";

class AnmeldungSuccess extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Gruppen-Anmeldung | STARTKLAR</title>
                </Helmet>

                <HeaderWhite />

                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Gruppen-Anmeldung</h1>
                            <h3>Ihr seid STARTKLAR!</h3>
                            <p>Danke für eure Anmeldung.<br/>
                                Wir sehen uns beim Jugendfestival und verbringen zusammen eine unvergessliche Zeit.</p>
                            <h3>Wie geht es weiter?</h3>
                            <p>Nach dem Anmeldeschluss am 16.04.2023 erhältst du eine Rechnung für die Teilnahmegebühren
                                der kompletten Gruppe per E-Mail.</p>
                            <p>Diese musst du <strong>innerhalb von 2 Wochen</strong> überweisen, <strong>ansonsten gilt
                                deine Anmeldung nicht als bestätigt!</strong></p>
                            <p>Bis dahin kannst du eure Anmeldung jederzeit bearbeiten und weitere Teilnehmer*innen
                                hinzufügen oder entfernen. Benutze dazu einfach den Link, den du am Anfang der Anmeldung
                                per E-Mail bekommen hast.</p>
                            <Link to="/"><Button><FontAwesomeIcon icon="arrow-left" />Zurück zur Startseite</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withSupportChat(AnmeldungSuccess);