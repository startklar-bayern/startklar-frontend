import React from "react";
import {Form, InputGroup, Overlay, Spinner, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import moment from "moment";
import 'moment/locale/de';
import PersonSelect from "../../components/personSelect";
import AnreiseFieldGroup from "./anreiseFieldGroup";

export default class PersonForm extends React.Component {

    constructor() {
        super();
        moment.locale('de');
    }

    state = {
        showInfoGeburtsdatum: false,
    };

    infoGeburtsdatumTarget = React.createRef();

    render() {
        let {
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            allValues,
            errors,
            isSubmitting,
            status,
            isValid,
            namePrefix,
            tshirtGroessen,
            termineSchutzkonzept,
            isAufsichtsperson,
            isLeitung,
            isHelfer,
        } = this.props;

        return (
            <>
                <Form.Group className="mb-3">
                    <Form.Label>Vorname *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".vorname"}
                        value={values?.vorname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.vorname && !!errors?.vorname}
                        placeholder="Maximilian"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.vorname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nachname *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".nachname"}
                        value={values?.nachname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.nachname && !!errors?.nachname}
                        placeholder="Mustermann"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.nachname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Geburtsdatum *</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="date"
                            max="2009-06-08"
                            min="1923-06-08"
                            name={namePrefix + ".geburtsdatum"}
                            value={values?.geburtsdatum}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.geburtsdatum && !!errors?.geburtsdatum}/>

                        <Button variant="outline-secondary" ref={this.infoGeburtsdatumTarget}
                                onClick={() => this.setShowInfo('Geburtsdatum', !this.state.showInfoGeburtsdatum)}>
                            <FontAwesomeIcon icon="info-circle"/>
                        </Button>

                        <Overlay target={this.infoGeburtsdatumTarget.current}
                                 show={this.state.showInfoGeburtsdatum}>
                            {(props) => (
                                <Tooltip {...props}>
                                    <p>Teilnahme ab 14 Jahren.</p>
                                    <p>Gruppenverantwortliche und Aufsichtspersonen müssen über 18 Jahre alt sein.</p>
                                </Tooltip>
                            )}
                        </Overlay>

                        <Form.Control.Feedback type="invalid">
                            {errors?.geburtsdatum}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Geschlecht *</Form.Label>

                    <Form.Select
                        name={namePrefix + ".geschlecht"}
                        value={values?.geschlecht}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.geschlecht && !!errors?.geschlecht}>
                        <option value="">- Auswählen -</option>
                        <option value="m">männlich</option>
                        <option value="w">weiblich</option>
                        <option value="d">divers</option>
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                        {errors?.geschlecht}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Straße und Nummer *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".strasse"}
                        value={values?.strasse}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.strasse && !!errors?.strasse}
                        placeholder="Musterstr. 1"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.strasse}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Postleitzahl *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".plz"}
                        value={values?.plz}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.plz && !!errors?.plz}
                        placeholder="12345"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.plz}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ort *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".ort"}
                        value={values?.ort}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.ort && !!errors?.ort}
                        placeholder="Musterstadt"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.ort}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefon *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".telefon"}
                        value={values?.telefon}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.telefon && !!errors?.telefon}
                        placeholder="0123 / 4567 89"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.telefon}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-Mail *</Form.Label>
                    <Form.Control
                        type="email"
                        name={namePrefix + ".mail"}
                        value={values?.mail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.mail && !!errors?.mail}
                        placeholder="m.mustermann@example.com"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.mail}
                    </Form.Control.Feedback>
                </Form.Group>

                {this.personIsUnderage(values) && <Form.Group className="mb-3">
                    <Form.Label>Telefon Erziehungsberechtige Person *</Form.Label>
                    <Form.Control
                        type="text"
                        name={namePrefix + ".telefon_eltern"}
                        value={values?.telefon_eltern}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.telefon_eltern && !!errors?.telefon_eltern}
                        placeholder="0123 / 4567 89"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.telefon_eltern}
                    </Form.Control.Feedback>
                </Form.Group>}

                {this.personIsUnderage(values) && <Form.Group className="mb-3">
                    <Form.Label>E-Mail Erziehungsberechtige Person *</Form.Label>
                    <Form.Control
                        type="email"
                        name={namePrefix + ".mail_eltern"}
                        value={values?.mail_eltern}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.mail_eltern && !!errors?.mail_eltern}
                        placeholder="m.mustermann@example.com"/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.mail_eltern}
                    </Form.Control.Feedback>
                </Form.Group>}

                {(!isHelfer && this.personIsUnderage(values)) && <PersonSelect
                    name={namePrefix + '.aufsichtsperson'}
                    value={values?.aufsichtsperson}
                    personId={values?.id}
                    maxBirthday="2005-06-11"
                    label="Aufsichtsperson"
                    required="true"
                    values={allValues}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched?.aufsichtsperson && !!errors?.aufsichtsperson}
                    errors={errors?.aufsichtsperson}
                    infoText={<>
                        <p>Du musst die Aufsichtsperson zuerst zu deiner Gruppe hinzufügen bevor du sie hier auswählen
                            kannst.</p>
                        <p>Die Aufsichtsperson muss über 18 Jahre alt sein, sollte dem Geschlecht des*der Teilnehmer*in
                            entsprechen und darf maximal für 10 Teilnehmer*innen zuständig sein</p>
                    </>}/>}

                <Form.Group className="mb-3">
                    <Form.Label>T-Shirt Größe *</Form.Label>
                    {tshirtGroessen.length !== 0 ? <Form.Select
                        name={namePrefix + ".tshirt_groesse"}
                        value={values?.tshirt_groesse?.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.tshirt_groesse && !!errors?.tshirt_groesse}>
                        <option value="">- Auswählen -</option>
                        {tshirtGroessen.map(groesse => <option value={groesse.id}
                                                               key={groesse.id}>{groesse.name}</option>)}
                    </Form.Select> : <div><Spinner animation="border"/></div>}

                    <Form.Control.Feedback type="invalid">
                        {errors?.tshirt_groesse}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Essensvorlieben *</Form.Label>
                    <Form.Select
                        name={namePrefix + ".essen"}
                        value={values?.essen}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.essen && !!errors?.essen}>
                        <option value="">- Auswählen -</option>
                        <option value="normal">keine besonderen Wünsche</option>
                        <option value="vegetarisch">vegetarisch</option>
                        <option value="vegan">vegan</option>
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                        {errors?.essen}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Allergien und Unverträglichkeiten beim Essen</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="2"
                        name={namePrefix + ".essen_anmerkungen"}
                        value={values?.essen_anmerkungen}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.essen_anmerkungen && !!errors?.essen_anmerkungen}/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.essen_anmerkungen}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sonstige Krankheiten / Allergien / Medikamente / ...</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="2"
                        name={namePrefix + ".anmerkungen"}
                        value={values?.anmerkungen}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.anmerkungen && !!errors?.anmerkungen}/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.anmerkungen}
                    </Form.Control.Feedback>
                </Form.Group>

                {!isHelfer && <div className="field-object">
                    <h3>Geschwister-Rabatt</h3>
                    <p>Bei Geschwisterkindern zahlt nur eine Person die volle Teilnahmegebühr.<br/>
                        Die anderen Geschwisterkinder zahlen 10 € weniger.<br/>
                        Gib hier das Geschwisterkind an, das den vollen Preis zahlt. Ansonsten nichts auswählen.</p>
                    <PersonSelect
                        name={namePrefix + '.geschwisterkind'}
                        value={values?.geschwisterkind}
                        personId={values?.id}
                        label="Geschwisterkind"
                        values={allValues}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        emptyLabel="kein Geschwisterkind"
                        isInvalid={touched?.geschwisterkind && !!errors?.geschwisterkind}
                        errors={errors?.geschwisterkind}
                        infoText={<>
                            <p>Du musst das Geschwisterkind zuerst zu deiner Gruppe hinzufügen bevor du es hier auswählen
                                kannst.</p>
                        </>}/>
                </div>}

                <AnreiseFieldGroup
                    isPersonAnreise="true"
                    touched={touched?.anreise}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    values={values?.anreise}
                    errors={errors?.anreise}
                    isSubmitting={isSubmitting}
                    status={status}
                    isValid={isValid}
                    namePrefix={namePrefix + '.anreise'}
                    isHelfer={isHelfer}
                />

                {(isLeitung || isAufsichtsperson || isHelfer) && <div className="field-object">
                    <h3>Schutzkonzept</h3>
                    {/*<p>Laut §72a SGB VIII dürfen Träger der Kinder- und Jugendhilfe keine Personen beschäftigen, die*/}
                    {/*    rechtskräftig wegen verschiedener Straftaten (z.B. sexueller Missbrauch) verurteilt worden sind.*/}
                    {/*    Die Kolpingjugend ist ein freier Träger der Kinder- und Jugendhilfe und somit verpflichtet*/}
                    {/*    Führungszeugnisse zu überprüfen. Weitere Informationen dazu findest du in unserem*/}
                    {/*    Schutzkonzept. */}

                    {(isLeitung || isHelfer) && <p>Als {isLeitung ? 'Gruppenleiter*in' : 'Helfer*in'} musst du an einer kurzen Einweisung in die Inhalte des
                        Schutzkonzepts teilnehmen. Diese wird online durchgeführt und dauert ca. 30 Minuten.</p>}

                    {isAufsichtsperson &&
                        <p>Aufsichtspersonen können an einer kurzen Einweisung in die Inhalte des Schutzkonzepts
                            teilnehmen, sind aber nicht dazu verpflichtet. Diese wird online durchgeführt und dauert ca.
                            30 Minuten.</p>}


                    <Form.Group className="mb-3">
                        <Form.Label>Termin Einweisung Schutzkonzept{(isLeitung || isHelfer) ? " *" : ""}</Form.Label>
                        {termineSchutzkonzept.length !== 0 ? <Form.Select
                            name={namePrefix + ".termin_schutzkonzept"}
                            value={values?.termin_schutzkonzept?.toString()}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.termin_schutzkonzept && !!errors?.termin_schutzkonzept}>
                            <option value="">- {(isLeitung || isHelfer) ? "Auswählen" : "nimmt nicht teil"} -</option>
                            {termineSchutzkonzept.map(termin => <option value={termin.id}
                                                                        key={termin.id}>{moment(termin.date).format('dddd, DD.MM.YYYY')} 19:00
                                Uhr</option>)}
                        </Form.Select> : <div><Spinner animation="border"/></div>}

                        <Form.Control.Feedback type="invalid">
                            {errors?.termin_schutzkonzept}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>}
            </>
        );
    }

    setShowInfo(name, status) {
        let propertyName = 'showInfo' + name;

        let stateChange = {};
        stateChange[propertyName] = status;

        this.setState(stateChange)
    }

    personIsUnderage(values) {
        return moment(values?.geburtsdatum).isAfter('2005-06-11')
    }
}
