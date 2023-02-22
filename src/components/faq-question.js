import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {Alert, Col, Collapse, Form, Row, Spinner} from "react-bootstrap";
import {withFormik} from "formik";
import * as Yup from "yup";
import {API_BASE_URL} from "../constants";

class FaqQuestion extends Component {
    state = {
        formOpen: false
    }

    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render() {
        let {
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            isSubmitting,
            status,
            isValid,
        } = this.props;

        if (status === undefined) {
            status = {
                success: false,
                error: false,
            }
        }

        return (
            <div className="faq-question text-center mt-4">
                <h6 className="mb-4">Noch fragen? Dann stelle sie uns hier:</h6>
                <Collapse in={this.state.formOpen}>
                    <div>
                        {isSubmitting &&
                            <Spinner animation="border"/>}

                        {!isSubmitting && status.error &&
                            <Alert variant="danger">
                                <p className="mb-0">
                                    Ein Fehler ist aufgetreten. Bitte lade die Seite neu und versuche es noch einmal
                                    oder wende dich an <a href="mailto:info@startklar.bayern">info@startklar.bayern</a>
                                </p>
                            </Alert>}

                        {!isSubmitting && status.success &&
                            <Alert variant="success">
                                <p className="mb-0">
                                    Deine Frage ist eingegangen. Wir werden uns schnellstmöglich bei dir melden!
                                </p>
                            </Alert>}

                        {!isSubmitting && !status.success && !status.error &&
                            <Row>
                                <Col lg={{ span: 6, offset: 3 }}>
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Dein Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.name}/>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Deine E-Mail-Adresse</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.email}/>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Deine Frage(n)</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="body"
                                                value={values.body}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!errors.body}/>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.body}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Button type="submit" disabled={!isValid}>Absenden <FontAwesomeIcon
                                                icon={faArrowRight}/></Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        }
                    </div>
                </Collapse>

                <Collapse in={!this.state.formOpen}>
                    <Button variant="primary" onClick={this.handleOnClick}>Frage stellen <FontAwesomeIcon
                        icon={faArrowRight}/></Button>
                </Collapse>
            </div>
        );
    }

    handleOnClick() {
        this.setState({
            formOpen: true
        })
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name ist erforderlich'),
        email: Yup.string().email('Die E-Mail Adresse ist ungültig').required('Die E-Mail Adresse ist erforderlich'),
        body: Yup.string().required('Frage ist erforderlich')
    }),

    handleSubmit: (values, {setSubmitting, setStatus}) => {
        setSubmitting(true);

        fetch(API_BASE_URL + 'faqs/question', {
            method: 'post',
            body: JSON.stringify({
                mail: values.email,
                name: values.name,
                question: values.body,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setSubmitting(false);

                console.log(data);

                if (data.status === "success") {
                    setStatus({
                        success: true,
                        error: false,
                    });
                } else {
                    setStatus({
                        success: false,
                        error: true,
                    })
                }

            })
            .catch(e => {
                console.error(e);

                setSubmitting(false);
                setStatus({
                    success: false,
                    error: true,
                });
            })
    }
})(FaqQuestion);