import React from "react";
import {Container, Row, Col, Button, Form, Alert}  from 'react-bootstrap'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import {withSupportChat} from "../../hoc/withSupportChat";

class CreateGroup extends React.Component {
  state = {
    mail: '',
  }

  handleChange = event => {
    this.setState({ mail: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const group = {
      "mail": this.state.mail,
      "participant_privacy_accepted": true,
      "privacy_accepted": true
    };

    axios
      .post('https://backend.startklar.bayern/api/anmeldung/group', group)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="createGroup">
            <Container>
              <Row className="my-4">
                <Col>
                  <h1>Anmeldung als Gruppe</h1>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <p>
                    Zuerst benötigen wir deine E-Mail Adresse.<br></br>
                    Du erhältst dann eine E-Mail mit einem Link unter dem du deine Anmeldung starten kannst.
                  </p>
                  <Form onSubmit={this.handleSubmit} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>E-Mail Adresse*</Form.Label>
                        <Form.Control
                            type="email"
                            name="mail"
                            placeholder="m.mustermann@example.com"
                            aria-label="E-Mail Adresse"
                            aria-describedby="E-Mail Adresse"
                            onChange={this.handleChange}
                            required
                          />
                      </Form.Group>

                     <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            required
                            name="weitergabe_daten_akzeptiert"
                            label="Ich habe das Einverständnis aller Teilnehmenden ihre Daten weiterzugeben *"
                        />
                      </Form.Group>


                      <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            required
                            name="datenschutzerklaerung_akzeptiert"
                            label="Ich habe die Datenschutzerklärung gelesen und akzeptiere diese *"/>
                      </Form.Group>

                      <Button type="submit">Absenden</Button>
                  </Form>

                  <hr></hr>

                  <div>
                    <Row>
                      <Col lg={1} xs={2}>
                        <FontAwesomeIcon size="2x" icon={faEnvelope}/>
                      </Col>
                      <Col lg={11} xs={10}>
                        <p>
                          Du solltest jetzt eine E-Mail mit einem Link erhalten haben. Schaue in deinem Posteingang und im Spam-Ordner nach und klicke auf den Link um fortzufahren.<br></br>
                          Du kannst diesen Link auch verwenden um deine Anmeldung bis zum Anmeldeschluss am 16.04.2023 jederzeit online zu bearbeiten.
                        </p>
                      </Col>
                    </Row>
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

export default withSupportChat(CreateGroup);