import React from 'react'
import {Alert, Collapse, Form, InputGroup, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withFormik} from 'formik';
import * as Yup from 'yup';
import '../assets/styles/newsletter.scss';

class Newsletter extends React.Component {

    state = {
        subscriberCount: 0,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('https://backend.startklar.bayern/api/newsletter')
            .then(res => res.json())
            .then((data) => {
                this.setState({subscriberCount: data.subscriber_count})
            })
            .catch(console.log)
    }

    render() {
        let {
            isValid,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            isSubmitting,
            setFieldTouched,
            status,
        } = this.props;

        if (status === undefined) {
            status = {
                success: false,
                error: false,
            }
        }

        return (
            <div className="newsletter">
                <h6>Bleib immer auf dem Laufenden</h6>
                <p>Lorem Ipsum dolor sit amet et consetutor, sadipscing elitr, sed diam nonumy eirmod empor ividunt ut
                    labore et dolore magna aliquyam. </p>

                {isSubmitting &&
                    <Spinner animation="border"/>}

                {!isSubmitting && status.error &&
                    <Alert variant="danger">
                        <p style={{marginBottom: 0}}>
                            Ein Fehler ist aufgetreten. Bitte wende dich an <a href="mailto:info@startklar.bayern">info@startklar.bayern</a>
                        </p>
                    </Alert>}

                {!isSubmitting && status.success &&
                    <Alert variant="success">
                        <p style={{marginBottom: 0}}>
                            Bitte klicke auf den Bestätigungslink in der E-Mail, die wir dir gesendet haben, um die Anmeldung abzuschließen.
                        </p>
                    </Alert>}

                {!isSubmitting && !status.success && !status.error &&
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="email"
                                placeholder="E-Mail Adresse"
                                name="email"
                                value={values.email}
                                onChange={e => {
                                    handleChange(e);
                                    setFieldTouched('email');
                                }}
                                onBlur={handleBlur}
                                isInvalid={!!errors.email}/>

                            <Button
                                type="submit"
                                variant="outline-secondary"
                                disabled={!isValid}
                            >Anmelden</Button>

                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Collapse in={touched.email}>
                        <Form.Group>
                            <Form.Check
                                required
                                type="checkbox"
                                name="privacyAccepted"
                                label="Ich habe die <a href=''>Datenschutzerklärung</a> gelesen und akzeptiere sie"
                                id="privacyAccepted"
                                key="checkbox-privacyAccepted"
                            >
                                <Form.Check.Input
                                    type="checkbox"
                                    isInvalid={!!touched.privacyAccepted && !!errors.privacyAccepted}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Check.Label>
                                    Ich habe die <a href="">Datenschutzerklärung</a> gelesen und akzeptiere sie
                                </Form.Check.Label>

                                <Form.Control.Feedback type="invalid">
                                    {errors.privacyAccepted}
                                </Form.Control.Feedback>
                            </Form.Check>
                        </Form.Group>
                    </Collapse>
                </Form>}

                <p><span className={status.success ? "animation-bounce" : ''}>{status.success ? this.state.subscriberCount + 1 : this.state.subscriberCount}</span> Personen sind schon STARTKLAR!</p>
            </div>
        );
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        privacyAccepted: false,
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string().email('Die E-Mail Adresse ist ungültig').required('Die E-Mail Adresse ist erforderlich'),
        privacyAccepted: Yup.boolean().required('Dies ist erforderlich').equals([true], 'Dies ist erforderlich'),
    }),

    handleSubmit: (values, {setSubmitting, setStatus}) => {
        setSubmitting(true);

        fetch('https://backend.startklar.bayern/api/newsletter', {
            method: 'post',
            body: JSON.stringify({
                mail: values.email,
                privacy_accepted: values.privacyAccepted,
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
    }
})(Newsletter);