import React from "react";
import {Button, Col, Container, Form, Row, Toast, ToastContainer} from 'react-bootstrap'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {withSupportChat} from "../../hoc/withSupportChat";
import {Helmet} from "react-helmet-async";
import HeaderWhite from "../../layouts/header-white";

class CreateGroup extends React.Component {
    state = {
        mail: '',
        submitted: false,
        loading: false,
        isError: false,
    }

    handleChange = event => {
        this.setState({mail: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            loading: true,
            isError: false,
        });

        const group = {
            "mail": this.state.mail,
            "participant_privacy_accepted": true,
            "privacy_accepted": true,
        };

        const url = `https://backend.startklar.bayern/api/anmeldung/${this.props.isHelfer ? 'helfer' : 'group'}`

        axios
            .post(url, group)
            .then(response => {
                console.log(response);

                this.setState({
                    submitted: true,
                })
            })
            .catch(error => {
                console.log(error);

                this.setState({
                    loading: false,
                    isError: true,
                });
            });
    }

    render() {
        const {isHelfer} = this.props;

        return (
            <div className="createGroup">
                <Helmet>
                    <title>{isHelfer ? 'Helfer*innen' : 'Gruppen'}-Anmeldung | STARTKLAR</title>
                </Helmet>

                <ToastContainer className="p-3" position="top-end">
                    <Toast bg="warning" autohide delay="5000" show={this.state.isError}
                           onClose={() => this.setState({isError: false, submitted: false})}>
                        <Toast.Body>
                            <strong>Es ist ein Fehler aufgetreten.</strong><br/>
                            Bitte kontaktiere uns über den Support-Chat.
                        </Toast.Body>
                    </Toast>
                </ToastContainer>

                <HeaderWhite/>

                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1>{isHelfer ? 'Helfer*innen' : 'Gruppen'}-Anmeldung</h1>
                        </Col>
                    </Row>

                    {!this.state.submitted && <Row>
                        <Col>
                            <p>
                                Zuerst benötigen wir deine E-Mail Adresse.<br></br>
                                Du erhältst dann eine E-Mail mit einem Link unter dem du deine Anmeldung starten kannst.
                            </p>
                            <Form onSubmit={this.handleSubmit} className="mb-4">
                                <Form.Group className="mb-3 col-lg-5">
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

                                {!isHelfer && <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        required
                                        name="weitergabe_daten_akzeptiert"
                                        label="Ich habe das Einverständnis aller Teilnehmenden ihre Daten weiterzugeben *"
                                    />
                                </Form.Group>}


                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        required
                                        name="datenschutzerklaerung_akzeptiert"
                                        label="Ich habe die Datenschutzerklärung gelesen und akzeptiere diese *"/>
                                </Form.Group>

                                <Button type="submit" disabled={this.state.loading}>
                                    <FontAwesomeIcon icon="paper-plane"/> Absenden
                                </Button>
                            </Form>
                        </Col>
                    </Row>}

                    {this.state.submitted && <Row>
                        <Col lg={1} xs={2}>
                            <FontAwesomeIcon size="2x" icon={faEnvelope}/>
                        </Col>
                        <Col lg={11} xs={10}>
                            <p>
                                Du solltest jetzt eine E-Mail mit einem Link erhalten haben. Schaue in deinem
                                Posteingang und im Spam-Ordner nach und klicke auf den Link um
                                fortzufahren.</p>
                            <p>
                                Du kannst diesen Link auch verwenden um deine Anmeldung bis zum Anmeldeschluss
                                am 16.04.2023 jederzeit online zu bearbeiten.
                            </p>
                        </Col>
                    </Row>}
                </Container>
            </div>
        )
    }
}

export default withSupportChat(CreateGroup);