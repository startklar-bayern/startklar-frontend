import React from "react";
import {Container, Row, Col}  from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Helmet} from "react-helmet-async";

class PageNotFound extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Seite nicht gefunden | STARTKLAR</title>
                </Helmet>
                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>Seite nicht gefunden</h1>
                            <p>Eventuell hast du einen alten Link verwendet oder dich bei der URL vertippt.</p>
                            <p>Überprüfe die URL auf Tippfehler oder verwende die Google-Suche.</p>
                            <Link to="/"><Button size="sm"><FontAwesomeIcon icon="arrow-left" /> Zur Startseite</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default PageNotFound;