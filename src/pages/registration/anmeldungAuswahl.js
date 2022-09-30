import React from "react";
import {Container, Row, Col, Card}  from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faHammer } from '@fortawesome/free-solid-svg-icons'

export default class AnmeldungAuswahl extends React.Component {
  render() {
    return (
        <div className="anmeldungAuswahl">
            <Container>
              <Row className="my-4">
                <Col>
                  <h1  className="text-center">Anmeldung</h1>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col className="text-center ">
                  <a href="/anmeldung-gruppe">
                    <Card>
                      <FontAwesomeIcon icon={faPeopleGroup} size="6x" className="text-dark my-4" />
                      <h2>Als Teilnehmer*in</h2>
                    </Card>
                  </a>
                </Col>
                <Col className="text-center">
                  <a href="/">
                    <Card>
                      <FontAwesomeIcon icon={faHammer} size="6x" className="text-dark my-4" />
                      <h2 >Als Helfer*in</h2>
                    </Card>
                  </a>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <a href="/">
                    <Card>
                      <h3 className="text-center">Schon angemeldet? Deine Anmeldung verwalten</h3>
                    </Card>
                  </a>
                </Col>
              </Row>
            </Container>
        </div>
    )
  }
}
