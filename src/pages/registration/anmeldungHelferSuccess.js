import React from "react";
import {Col, Container, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {withSupportChat} from "../../hoc/withSupportChat";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class AnmeldungHelferSuccess extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Helfer*innen-Anmeldung</h1>
                            <h3>Du bist STARTKLAR!</h3>
                            <p>Danke für eure Anmeldung.<br/>
                                Wir sehen uns beim Jugendfestival und verbringen zusammen eine unvergessliche Zeit.</p>
                            <h3>Wie geht es weiter?</h3>
                            <p>Du erhältst bald vom Jugendbüro der Kolpingjugend Bayern eine Information über die
                                Prozedur mit dem Führungszeugnis.</p>
                            <p>Außerdem wird sich auch deine zuständige AG-Leitung in kürze bei dir melden.</p>
                            <p>Nach dem Anmeldeschluss am 16.04.2023 erhältst du eine Rechnung für die Teilnahmegebühren
                                der per E-Mail.</p>
                            <p>Diese musst du <strong>innerhalb von 2 Wochen</strong> überweisen, <strong>ansonsten gilt
                                deine Anmeldung nicht als bestätigt!</strong></p>
                            <p>Bis dahin kannst du deine Anmeldung jederzeit bearbeiten. Benutze dazu einfach den Link,
                                den du am Anfang der Anmeldung per E-Mail bekommen hast.</p>
                            <Link to="/"><Button><FontAwesomeIcon icon="arrow-left"/>Zurück zur
                                Startseite</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withSupportChat(AnmeldungHelferSuccess);