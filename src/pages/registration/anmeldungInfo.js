import React from "react";
import {Container, Row, Col, Alert}  from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

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
                  <p>
                    Info...
                  </p>
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
