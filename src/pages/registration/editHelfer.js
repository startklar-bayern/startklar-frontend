import React, {Component, useEffect} from "react";
import {withSupportChat} from "../../hoc/withSupportChat";
import {useFormikContext, withFormik} from "formik";
import {helferAnmeldungSchema} from "./anmeldungSchema";
import moment from "moment/moment";
import {Helmet} from "react-helmet-async";
import {Col, Container, Form, Modal, Row, Spinner, Toast, ToastContainer} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Pricing from "./pricing";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import PersonForm from "./personForm";
import {get} from "underscore";
import {v4 as uuid} from "uuid";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {HeaderWhite} from "../../layouts";

function withParams(Component) {
    return props => <Component {...props}
                               params={useParams()}
                               location={useLocation().search}
                               navigate={useNavigate()}/>;
}

class EditHelfer extends Component {
    state = {
        jobs: [],
        tshirtGroessen: [],
        termineSchutzkonzept: [],
        modalPerson: null,
        loading: false,
        mode: 'loading',
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.loadSelectData();
        this.getStoredData();
    }

    componentWillUnmount() {
        clearInterval(this.tempStorageUpdateInterval)
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
            setStatus,
            isValid,
            navigate
        } = this.props;

        if (status === 'success' && this.state.mode === 'create') {
            navigate('/anmeldung-helfer-success')
        }

        return (
            <div className="registration">
                <Helmet>
                    <title>Helfer*innen-Anmeldung | STARTKLAR</title>
                </Helmet>

                <HeaderWhite/>

                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">Helfer*innen-Anmeldung</h1>
                        </Col>
                    </Row>
                    {(this.state.mode === 'create' || this.state.mode === 'update') &&
                        <Row className="justify-content-center">
                            <Col className="field-object align-self-center" lg="7">
                                <div
                                    className={'field-object mt-0 bg-warning text-black'}>
                                    <Row>
                                        <Col md="1">
                                            <FontAwesomeIcon
                                                icon={'warning'}
                                                size="xl"></FontAwesomeIcon>
                                        </Col>
                                        <Col md="11">
                                            <p> Achtung: Deine Änderungen werden erst gespeichert wenn du am Ende des
                                                Formulars auf speichern klickst.</p>
                                            <p>Du kannst deine Daten bis zum Anmeldeschluss am 16.04.2023 jederzeit über
                                                den Link aus der E-Mail bearbeiten.</p>
                                        </Col>
                                    </Row>
                                </div>

                                <Form noValidate onSubmit={handleSubmit}>
                                    <this.FormObserver/>

                                    <div>
                                        <h3>Persönliche Daten</h3>
                                        <p>Gib hier deine persönlichen Daten an.</p>
                                        {values.person && <PersonForm
                                            touched={get(touched, 'person')}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            handleSubmit={handleSubmit}
                                            values={get(values, 'person')}
                                            allValues={values}
                                            errors={get(errors, 'person')}
                                            isSubmitting={isSubmitting}
                                            status={status}
                                            isValid={isValid}
                                            namePrefix="person"
                                            termineSchutzkonzept={this.state.termineSchutzkonzept}
                                            tshirtGroessen={this.state.tshirtGroessen}
                                            isAufsichtsperson={false}
                                            isLeitung={false}
                                            isHelfer={true}
                                        ></PersonForm>}
                                    </div>

                                    <div className="field-object">
                                        <h3>Unterbringung</h3>
                                        <p>Gib hier deine Wünsche zur Unterbringung an. Möchtest du bei einer bestimmten
                                            Gruppe untergebracht werden, oder ist dir das egal?</p>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                as="textarea"
                                                rows="2"
                                                name="unterbringung"
                                                value={values.unterbringung}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.unterbringung && !!errors.unterbringung}/>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.unterbringung}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>

                                    <div className="field-object">
                                        <h3>Aufgaben *</h3>

                                        <p>Welche Aufgaben kannst du übernehmen? Wo siehst du deine Stärken?</p>
                                        <p>Beachte dass einige Jobs schon vergeben sein könnten und du auch für andere
                                            Aufgaben eingeteilt werden könntest.</p>

                                        <Form.Group className="mb-3">
                                            {this.state.jobs.length > 0 ? <>
                                                {this.state.jobs.map(job => {
                                                    return (
                                                        <Form.Check
                                                            key={'jobselect-' + job.id}>
                                                            <Form.Check.Input
                                                                name="jobs"
                                                                value={job.id}
                                                                type="checkbox"
                                                                checked={values.jobs.indexOf(job.id + '') !== -1}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.jobs && !!errors.jobs} />
                                                            <Form.Check.Label className="fw-bold text-primary">{job.name}</Form.Check.Label>
                                                            <div dangerouslySetInnerHTML={{__html: job.description}}></div>
                                                        </Form.Check>
                                                    )
                                                })}
                                            </> : <Spinner animation="border"/>}
                                        </Form.Group>
                                    </div>

                                    <p>Während der Veranstaltung werden Fotos gemacht, die im Zuge der
                                        Öffentlichkeitsarbeit verwendet werden. Mit der Anmeldung zum Jugendfestival
                                        stimmst du dem zu.</p>


                                    <Pricing values={values} isHelfer={true}/>

                                    <Form.Group>
                                        <Button type="submit" disabled={!isValid || isSubmitting}>
                                            {this.state.mode === 'create' ? 'Kostenpflichtig anmelden' : 'Änderungen speichern'}
                                            {!isSubmitting && <FontAwesomeIcon icon={faArrowRight}/>}
                                            {isSubmitting &&
                                                <Spinner animation="border" size="sm" className="m-2 mt-0 mb-0"/>}
                                        </Button>

                                        {!isValid && <Row className="text-danger mt-2">
                                            <Col xs="1"><FontAwesomeIcon icon="warning"/></Col>
                                            <Col>
                                                Stelle sicher, dass du alle Pflichtfelder und alle Warnungen behoben
                                                hast.
                                                Erst dann kannst du deine Helfer*innenanmmeldung abschließen.

                                                <details className="small">
                                                    <summary>Technische Details</summary>
                                                    <pre>
                                                    {JSON.stringify(errors, null, '  ')}
                                                </pre>
                                                </details>
                                            </Col>
                                        </Row>}
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>}

                    {this.state.mode === 'loading' && <Row>
                        <Col className="text-center">
                            <h3><Spinner animation="border"/> Daten werden geladen...</h3>
                        </Col>
                    </Row>}

                    {this.state.mode === 'invalidUrl' && <Row>
                        <Col className="text-center">
                            <h3><FontAwesomeIcon icon="warning"/> Ein Fehler ist aufgetreten</h3>
                            <p>Es gab Probleme beim Laden deiner Daten. Entweder ist der Link, den du verwendet hast,
                                nicht mehr gültig oder unvollständig.</p>
                            <p>Versuche die Seite neu zu laden und prüfe ob du den richtigen Link verwendet hast.</p>
                            <p>Solltest du weiterhin Probleme haben, kannst du uns über den Support-Chat oder per E-Mail
                                an <a
                                    href="mailto:anmeldung@startklar.bayern">anmeldung@startklar.bayern</a> kontaktieren.
                            </p>
                        </Col>
                    </Row>}
                </Container>


                <ToastContainer className="p-3 position-fixed" position="top-end" style={{zIndex: 999}}>
                    <Toast bg="danger" autohide delay="15000" show={status === 'error'}
                           onClose={() => setStatus('none')}>
                        <Toast.Header>
                            <strong className="me-auto">Es ist ein Fehler aufgetreten</strong>
                        </Toast.Header>
                        <Toast.Body>
                            Bitte kontaktiere uns über den Support-Chat oder per E-Mail an <a
                            href="mailto:anmeldung@startklar.bayern"
                            className="text-black">anmeldung@startklar.bayern</a>.
                        </Toast.Body>
                    </Toast>

                    <Toast bg="success" autohide delay="5000" show={status === 'success'}
                           onClose={() => setStatus('none')}>
                        <Toast.Header>
                            <strong className="me-auto">Gespeichert</strong>
                        </Toast.Header>
                        <Toast.Body>
                            Deine Änderungen wurden erfolgreich gespeichert.
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        );
    }

    getTokenFromUrl() {
        return new URLSearchParams(this.props.location).get("token");
    }

    getApiPath(endpoint = "tempStorage") {
        return 'https://backend.startklar.bayern/api/anmeldung/' + endpoint + '/' + this.props.params.helferId;
    }

    initializePerson() {
        let {values, setValues} = this.props;
        values.person = {
            id: uuid(),
            geburtsdatum: null,
            anreise: {
                mit_gruppe: false,
                typ: 'mit_dv',
                ziel: '',
                ankunft: '2023-06-08T10:00:00',
                abfahrt: '2023-06-11T13:00:00',
            }
        };

        values.jobs = [];

        setValues(values);
    }

    FormObserver = () => {
        const {values} = useFormikContext();
        useEffect(() => {
            this.tempData = values;
        })

        return null;
    }

    loadSelectData() {
        // Load Jobs
        fetch('https://backend.startklar.bayern/api/anmeldung/helfer-jobs')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jobs: data,
                })
            })
            .catch(error => {
                console.error(error);
            })

        // Load Termine Schutzkonzept
        fetch('https://backend.startklar.bayern/api/anmeldung/termine-schutzkonzept')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error while loading schutzkonzept termine");
            })
            .then(data => {
                this.setState({
                    termineSchutzkonzept: data
                });
            })
            .catch(error => {
                console.error(error);
            });

        // Load T-Shirt Größen
        fetch('https://backend.startklar.bayern/api/anmeldung/tshirt-groessen')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error while loading T-Shirt Größen");
            })
            .then(data => {
                this.setState({
                    tshirtGroessen: data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    getStoredData() {
        fetch(this.getApiPath('helfer'), {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.getTokenFromUrl()
            }
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error("Not yet submitted");
                    }

                    if (response.status === 403 || response.status === 401) {
                        throw new Error("Unauthorized")
                    }

                    if (response.status === 404) {
                        throw new Error("Helfer not found")
                    }

                    throw new Error("No 2xx response");
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.massageValues(data);
                this.props.setValues(data);

                this.setState({
                    mode: 'update'
                });
            })
            .catch(error => {
                if (error.message === 'Not yet submitted') {
                    this.setState({
                        mode: 'create',
                    });
                    this.initializePerson();
                } else if (error.message === 'Unauthorized') {
                    this.setState({
                        mode: 'invalidUrl',
                    })
                } else if (error.message === 'Helfer not found') {
                    this.setState({
                        mode: 'invalidUrl',
                    })
                } else {
                    console.error(error);
                }


            });
    }

    massageValues(data) {
        data.person.anreise.mit_gruppe = false;

        if (data.person.anreise && !data.person.anreise.hasOwnProperty('ankunft')) {
            data.person.anreise.ankunft = "2023-06-08T10:00:00"
            data.person.anreise.abfahrt = "2023-06-11T13:00:00"
            data.person.anreise.typ = "mit_dv"
            data.person.anreise.ziel = "direkt"
        }
    }
}

export default withSupportChat(withParams(withFormik({
        mapPropsToValues: () => ({
            "person": {
                anreise: {
                    mit_gruppe: false,
                }
            },
            "jobs": [],
        }),

        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
        validationSchema: helferAnmeldungSchema,

        handleSubmit: (values, {setSubmitting, setStatus, props}) => {
            const formData = helferAnmeldungSchema.cast(values, {
                stripUnknown: true,
            });

            const replacer = function (key, value) {
                if (key.indexOf('geburtsdatum') !== -1) {
                    return moment(this[key]).format('YYYY-MM-DD')
                }

                if (this[key] instanceof Date) {
                    return moment(this[key]).format();
                }

                return value;
            }

            const formDataString = JSON.stringify(formData, replacer);


            setSubmitting(true);

            const token = new URLSearchParams(props.location).get("token");
            const helferId = props.params.helferId;

            console.log('test')

            fetch('https://backend.startklar.bayern/api/anmeldung/helfer/' + helferId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formDataString,
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Response not 200');
                }
                console.log(response);
                return response.text();
            }).then(data => {
                console.log(data);
                setStatus('success')
                setSubmitting(false)
            }).catch(error => {
                console.error(error);
                setSubmitting(false);
                setStatus('error')
            })

        }
    })
    (EditHelfer)
))
;