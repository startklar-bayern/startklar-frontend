import React from "react";
import {Form, InputGroup, Overlay, Tooltip} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class AnreiseFieldGroup extends React.Component {
    state = {
        showInfoAnreise: false,
        showInfoAlternative: false,
    }

    infoAnreiseTarget = React.createRef();
    infoAlternativeTarget = React.createRef();

    render() {
        const {
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            isSubmitting,
            status,
            isValid,
            namePrefix,
            isPersonAnreise,
            isHelfer
        } = this.props

        let anreiseMitGruppe = !!values?.mit_gruppe;

        return (
            <div className="field-object">
                <h3>Anreise</h3>

                {isPersonAnreise && !isHelfer && <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        name={namePrefix + ".mit_gruppe"}
                        label="Person reist zusammen mit der Gruppe an"
                        checked={anreiseMitGruppe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched?.mit_gruppe && !!errors?.mit_gruppe}/>

                    <Form.Control.Feedback type="invalid">
                        {errors?.mit_gruppe}
                    </Form.Control.Feedback>
                </Form.Group>}

                {(!isPersonAnreise || !anreiseMitGruppe) && <>
                    <Form.Group className="mb-3">
                        <Form.Label>Anreise *</Form.Label>
                        <InputGroup>
                            <Form.Select
                                name={namePrefix + ".typ"}
                                value={values?.typ}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.typ && !!errors?.typ}>
                                <option value="mit_dv">Mit Diözesanverband (falls möglich)</option>
                                <option value="selbststaendig">Selbstständig</option>
                            </Form.Select>

                            <Button variant="outline-secondary" ref={this.infoAnreiseTarget}
                                    onClick={() => this.setShowInfo('Anreise', !this.state.showInfoAnreise)}>
                                <FontAwesomeIcon icon="info-circle"/>
                            </Button>

                            <Overlay target={this.infoAnreiseTarget.current}
                                     show={this.state.showInfoAnreise}>
                                {(props) => (
                                    <Tooltip {...props}>
                                        <p>Je nach Teilnehmer*innenzahl werden von den verschiedenen Diözesanverbänden
                                            gemeinsame Busfahrten organisiert. Dies wird aber erst nach
                                            Anmeldeschluss bekannt gegeben.</p>
                                        <p>Deshalb musst du auch angeben wie ihr anreist, falls euer DV
                                            keine Busfahrt anbietet.</p>
                                    </Tooltip>
                                )}
                            </Overlay>

                            <Form.Control.Feedback type="invalid">
                                {errors?.typ}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>{values?.typ === 'mit_dv' ? 'Falls der Diözesanverband keine Fahrt anbietet kommen wir... *' : 'Wir kommen... *'}</Form.Label>

                        <InputGroup>
                            <Form.Select
                                name={namePrefix + ".ziel"}
                                value={values?.ziel}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.ziel && !!errors?.ziel}>
                                <option value="">- Auswählen -</option>
                                <option value="direkt">... direkt zum Zeltplatz</option>
                                <option value="zug_allersberg">... mit dem Zug nach Allersberg</option>
                                <option value="zug_hilpoltstein">... mit dem Zug nach Hilpoltstein
                                </option>
                            </Form.Select>

                            <Button variant="outline-secondary" ref={this.infoAlternativeTarget}
                                    onClick={() => this.setShowInfo('Alternative', !this.state.showInfoAlternative)}>
                                <FontAwesomeIcon icon="info-circle"/>
                            </Button>

                            <Overlay target={this.infoAlternativeTarget.current}
                                     show={this.state.showInfoAlternative}>
                                {(props) => (
                                    <Tooltip {...props}>
                                        <p>Der Zeltplatz ist mit öffentlichen Verkehrsmitteln gut zu
                                            erreichen und die Parkplätze sind begrenzt.</p>
                                        <p>Wir bieten euch einen Shuttleservice vom Bahnhof Kinding oder
                                            Allersberg zum Zeltplatz an falls ihr das hier angebt.</p>
                                    </Tooltip>
                                )}
                            </Overlay>

                            <Form.Control.Feedback type="invalid">
                                {errors?.ziel}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ankunft am *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name={namePrefix + ".ankunft"}
                            value={values?.ankunft}
                            min="2023-06-08T00:00"
                            max="2023-06-11T23:59"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.ankunft && !!errors?.ankunft}/>

                        <Form.Control.Feedback type="invalid">
                            {errors?.ankunft}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Abfahrt am *</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name={namePrefix + ".abfahrt"}
                            value={values?.abfahrt}
                            min="2023-06-08T00:00"
                            max="2023-06-11T23:59"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched?.abfahrt && !!errors?.abfahrt}/>

                        <Form.Control.Feedback type="invalid">
                            {errors?.abfahrt}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>}

                {!isPersonAnreise && <p>Die Anreisedaten kannst du für alle Teilnehmenden einzeln anpassen, falls jemand
                    später oder früher anreist.</p>}
            </div>
        )
    }

    setShowInfo(name, status) {
        let propertyName = 'showInfo' + name;

        let stateChange = {};
        stateChange[propertyName] = status;

        this.setState(stateChange)
    }
}