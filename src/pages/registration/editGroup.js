import React, {useEffect} from "react";
import {
    Container,
    Form,
    Row,
    Spinner,
    Col,
    Modal, Toast, ToastContainer
} from "react-bootstrap";
import './../../assets/styles/forms.scss';
import './../../assets/styles/registration.scss';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {withSupportChat} from "../../hoc/withSupportChat";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useFormikContext, withFormik} from "formik";
import PersonForm from "./personForm";
import {v4 as uuid} from "uuid";
import {get, findIndex} from "underscore";
import PersonCard from "../../components/personCard";
import anmeldungSchema from "./anmeldungSchema";
import AnreiseFieldGroup from "./anreiseFieldGroup";
import Pricing from "./pricing";
import moment from "moment";

function withParams(Component) {
    return props => <Component {...props}
                               params={useParams()}
                               location={useLocation().search}
                               navigate={useNavigate()}/>;
}

class EditGroup extends React.Component {
    tempData = {};
    oldTempData = {};
    tempStorageUpdateInterval = false;

    state = {
        dvs: [],
        tshirtGroessen: [],
        termineSchutzkonzept: [],
        modalPerson: null,
        loading: false,
        mode: 'loading',
    };

    constructor(props, context) {
        super(props, context);

        this.addTeilnehmer = this.addTeilnehmer.bind(this);
        this.removeTeilnehmer = this.removeTeilnehmer.bind(this);
        this.showPersonModal = this.showPersonModal.bind(this);
        this.closePersonModal = this.closePersonModal.bind(this);
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
            navigate('/anmeldung-success')
        }

        const modalPersonPath = this.state.modalPerson?.replace(']', '').split('[');

        return (
            <div className="registration">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">Gruppen-Anmeldung</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="field-object align-self-center" lg="7">
                            <div className="field-object mt-0">
                                <Row>
                                    <Col md="1">
                                        <FontAwesomeIcon icon={this.state.mode === 'create' ? 'info-circle' : 'warning'}
                                                         size="xl"></FontAwesomeIcon>
                                    </Col>
                                    <Col md="11">
                                        {this.state.mode === 'create' && <div>
                                            <p>Alle Änderungen die du in diesem Formular machst werden automatisch
                                                zwischengespeichert.</p>
                                            <p>Wenn du also noch nicht alle Daten hast, kannst du über den Link aus der
                                                E-Mail jederzeit hierher zurückkehren und die Anmeldung fortsetzen.</p>
                                        </div>}

                                        {this.state.mode === 'update' && <div>
                                            Achtung: Deine Änderungen werden erst gespeichert wenn du am Ende des
                                            Formulars auf speichern klickst.
                                        </div>}

                                    </Col>
                                </Row>
                            </div>

                            <Form noValidate onSubmit={handleSubmit}>
                                <this.FormObserver/>

                                <Form.Group className="mb-3">
                                    <Form.Label>Gruppen-Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.name && !!errors.name}
                                        placeholder="Kolpingjugend Musterhausen"/>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Diözesanverband *</Form.Label>
                                    {this.state.dvs.length !== 0 ? <Form.Select
                                        name="dv"
                                        value={values.dv?.toString()}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.dv && !!errors.dv}>
                                        <option value="">- Auswählen -</option>
                                        {this.state.dvs.map(dv => <option value={dv.id} key={dv.id}>{dv.name}</option>)}
                                    </Form.Select> : <div><Spinner animation="border"/></div>}

                                    <Form.Control.Feedback type="invalid">
                                        {errors.dv}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <AnreiseFieldGroup
                                    touched={touched.anreise}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    handleSubmit={handleSubmit}
                                    values={values.anreise}
                                    errors={errors.anreise}
                                    isSubmitting={isSubmitting}
                                    status={status}
                                    isValid={isValid}
                                    namePrefix="anreise"
                                />

                                <div className="field-object">
                                    <h3>Gruppenleiter*in</h3>
                                    <p>Gib hier deine persönlichen Daten an. Du bist Gruppenleiter*in und für deine
                                        Gruppe verantwortlich. Außerdem sorgst du auch für die Einhaltung des
                                        Schutzkonzepts, nimmst an der Einweisung dazu teil und bist Ansprechpartner*in
                                        für Rückfragen.</p>
                                    {values.leitung && <PersonCard
                                        key="leitung"
                                        person={values.leitung}
                                        allValues={values}
                                        allowDelete={false}
                                        errors={errors.leitung}
                                        onEdit={() => this.showPersonModal('leitung')}/>}
                                </div>

                                <div className="field-object">
                                    <h3>Teilnehmende</h3>
                                    {this.renderTeilnehmer(values.teilnehmer, values)}
                                    <Button size="sm" onClick={this.addTeilnehmer}><FontAwesomeIcon
                                        icon="user-plus"/> Teilnehmer*in hinzufügen</Button>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        name="jugendschutzgesetz_akzeptiert"
                                        label="Ich sorge für die Einhaltung des Jugendschutzgesetzes *"
                                        checked={values.jugendschutzgesetz_akzeptiert}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.jugendschutzgesetz_akzeptiert && !!errors.jugendschutzgesetz_akzeptiert}/>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.jugendschutzgesetz_akzeptiert}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        name="fuehrungszeugnis"
                                        label="Ich habe am Festival ein einwandfreies Führungszeugnis und sorge auch dafür dass alle Aufsichtspersonen in meiner Gruppe eines besitzen. Informationen dazu im Schutzkonzept.*" // TODO: Link zu Schutzkonzept
                                        checked={values.fuehrungszeugnis}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.fuehrungszeugnis && !!errors.fuehrungszeugnis}/>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.fuehrungszeugnis}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <p>Während der Veranstaltung werden Fotos gemacht die im Zuge der Öffentlichkeitsarbeit
                                    verwendet werden. Mit der Anmeldung zum Jugendfestival stimmst du dem zu und hast
                                    auch das Einverständnis aller Teilnehmenden deiner Gruppe.</p>


                                <Pricing values={values}/>

                                <Form.Group>
                                    <Button type="submit" disabled={!isValid || isSubmitting}>
                                        {this.state.mode === 'create' ? 'Gruppe kostenpflichtig anmelden' : 'Änderungen speichern'}
                                        {!isSubmitting && <FontAwesomeIcon icon={faArrowRight}/>}
                                        {isSubmitting &&
                                            <Spinner animation="border" size="sm" className="m-2 mt-0 mb-0"/>}
                                    </Button>

                                    {!isValid && <Row className="text-danger mt-2">
                                        <Col xs="1"><FontAwesomeIcon icon="warning"/></Col>
                                        <Col>
                                            Stelle sicher, dass du alle Pflichtfelder und alle Warnungen behoben hast.
                                            Erst dann kannst du deine Gruppenanmeldung abschließen.

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
                    </Row>
                </Container>


                <Modal show={this.state.modalPerson} onHide={this.closePersonModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Person bearbeiten</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.modalPerson && <PersonForm
                            touched={get(touched, modalPersonPath)}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleSubmit={handleSubmit}
                            values={get(values, modalPersonPath)}
                            allValues={values}
                            errors={get(errors, modalPersonPath)}
                            isSubmitting={isSubmitting}
                            status={status}
                            isValid={isValid}
                            namePrefix={this.state.modalPerson}
                            termineSchutzkonzept={this.state.termineSchutzkonzept}
                            tshirtGroessen={this.state.tshirtGroessen}
                            isAufsichtsperson={this.getBeaufsichtigtePersonenCount(get(values, modalPersonPath), values) > 0}
                            isLeitung={this.state.modalPerson === "leitung"}
                        ></PersonForm>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.closePersonModal}>Schließen</Button>
                    </Modal.Footer>
                </Modal>

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

    renderTeilnehmer(teilnehmerList, values) {
        let result = [];

        const teilnehmers = JSON.parse(JSON.stringify(teilnehmerList));
        teilnehmers.sort((a, b) => {
            return a.nachname?.localeCompare(b.nachname) || a.vorname?.localeCompare(b.nachname)
        })

        teilnehmers.forEach(teilnehmer => {
            let index = findIndex(this.props.values.teilnehmer, item => item.id === teilnehmer.id);
            result.push(<PersonCard
                mb="2"
                key={teilnehmer.id}
                person={teilnehmer}
                allValues={values}
                allowDelete={true}
                errors={get(this.props.errors, ['teilnehmer', index])}
                onDelete={() => this.removeTeilnehmer(index)}
                onEdit={() => this.showPersonModal('teilnehmer[' + index + ']')}/>)
        })

        return result
    }

    getBeaufsichtigtePersonenCount(person, values) {
        let people = [values.leitung];
        people.push(...values.teilnehmer);

        people = people.filter(value => value !== null);
        people = people.filter(value => value?.aufsichtsperson === person.id);

        return people.length;
    }

    getTokenFromUrl() {
        return new URLSearchParams(this.props.location).get("token");
    }

    getApiPath(endpoint = "tempStorage") {
        return 'https://backend.startklar.bayern/api/anmeldung/' + endpoint + '/' + this.props.params.groupId;
    }

    initializeLeitung() {
        let {values, setValues} = this.props;
        values.leitung = {
            id: uuid(),
            geburtsdatum: null,
            anreise: {
                mit_gruppe: true,
                typ: 'mit_dv',
                ziel: '',
                ankunft: '2023-06-08T10:00:00',
                abfahrt: '2023-06-11T13:00:00',
            }
        };

        setValues(values);
    }

    addTeilnehmer() {
        let {values, setValues} = this.props;

        values.teilnehmer.push({
            id: uuid(),
            geburtsdatum: null,
            anreise: {
                mit_gruppe: true,
                typ: 'mit_dv',
                ziel: '',
                ankunft: '2023-06-08T10:00:00',
                abfahrt: '2023-06-11T13:00:00',
            }
        });

        this.showPersonModal('teilnehmer[' + (values.teilnehmer.length - 1) + ']');

        setValues(values);
    }

    removeTeilnehmer(index) {
        let {values, setValues} = this.props

        values.teilnehmer.splice(index, 1);

        setValues(values);
    }

    showPersonModal(path) {
        this.setState({
            modalPerson: path,
        });
    }

    closePersonModal() {
        this.setState({
            modalPerson: null
        });
    }

    FormObserver = () => {
        const {values} = useFormikContext();
        useEffect(() => {
            this.tempData = values;
        })

        return null;
    }

    tempStorageDataMigration(data) {
        // Verwerfe alle tempStorage daten ohne Version
        if (!data.version) {
            return false;
        }

        // Remove the version field from the data
        delete data.version;

        return data;
    }

    loadSelectData() {
        // Load DVs
        fetch('https://backend.startklar.bayern/api/anmeldung/dvs')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dvs: data,
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
        fetch(this.getApiPath('group'), {
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

                // TODO:
                // data = this.tempStorageDataMigration(data);
                //
                // if (data) {
                //     this.props.setValues(data);
                // } else {
                //     this.initializeLeitung();
                // }
                //
                // this.setState({
                //     formDataTemp: data
                // });
            })
            .catch(error => {
                if (error.message === 'Not yet submitted') {
                    this.setState({
                        mode: 'create',
                    });

                    this.initializeTempStore();
                } else {
                    console.error(error);
                }


            });
    }

    initializeTempStore() {
        // Load temp data
        fetch(this.getApiPath(), {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.getTokenFromUrl()
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No 2xx response");
                }

                return response.json();
            })
            .then((data) => {
                data = this.tempStorageDataMigration(data);

                if (data) {
                    this.props.setValues(data);
                } else {
                    this.initializeLeitung();
                }

                this.setState({
                    formDataTemp: data
                });
            })
            .catch(error => {
                console.error(error);
                this.initializeLeitung();
            });


        // Autosave temp data
        if (this.tempStorageUpdateInterval) {
            clearInterval(this.tempStorageUpdateInterval);
        }

        this.tempStorageUpdateInterval = setInterval(() => {
            // Set version for later migrations
            this.tempData.version = 1;

            let formData = JSON.stringify(this.tempData);

            if (formData === this.oldTempData) {
                return;
            }

            this.oldTempData = JSON.stringify(this.tempData);

            fetch(this.getApiPath(), {
                method: 'put',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + this.getTokenFromUrl()
                }
            })
                .then(response => response.json())
                .catch(function (error) {
                    console.error(error);
                })
        }, 10000);
    }

    massageValues(data) {
        if (data.leitung.anreise && !data.leitung.anreise.hasOwnProperty('ankunft')) {
            data.leitung.anreise.ankunft = "2023-06-08T10:00:00"
            data.leitung.anreise.abfahrt = "2023-06-11T13:00:00"
            data.leitung.anreise.typ = "mit_dv"
            data.leitung.anreise.ziel = "direkt"
        }

        for (let i = 0; i < data.teilnehmer.length; i++) {
            if (data.teilnehmer[i].anreise && !data.teilnehmer[i].anreise.hasOwnProperty('ankunft')) {
                data.teilnehmer[i].anreise.ankunft = "2023-06-08T10:00:00"
                data.teilnehmer[i].anreise.abfahrt = "2023-06-11T13:00:00"
                data.teilnehmer[i].anreise.typ = "mit_dv"
                data.teilnehmer[i].anreise.ziel = "direkt"
            }
        }
    }
}


export default withSupportChat(withParams(withFormik({
    mapPropsToValues: () => ({
        "name": '',
        "dv": null,
        "anreise": {
            "typ": 'mit_dv',
            "ziel": '',
            "ankunft": '2023-06-08T10:00:00',
            "abfahrt": '2023-06-11T13:00:00',
        },
        "leitung": {},
        "teilnehmer": [],
        "jugendschutzgesetz_akzeptiert": false,
        "fuehrungszeugnis": false
    }),

    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,

    validationSchema: anmeldungSchema,

    handleSubmit: (values, {setSubmitting, setStatus, props}) => {
        const formData = anmeldungSchema.cast(values, {
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
        const groupId = props.params.groupId;

        fetch('https://backend.startklar.bayern/api/anmeldung/group/' + groupId, {
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
            // TODO
        }).catch(error => {
            console.error(error);
            setSubmitting(false);
            setStatus('error')
            // TODO
        })

    }
})(EditGroup)));