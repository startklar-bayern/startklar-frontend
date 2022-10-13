import React from "react";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {getReferencedPersonByUuid, getReferencingPeople} from "../pages/registration/toolbox";

class PersonCard extends React.Component {
    state = {}

    render() {
        let {allowDelete, onDelete, onEdit, errors, person, allValues} = this.props;


        const errorMessages = this.polishErrors(errors);

        const quickFacts = this.getQuickFacts(person, allValues);


        return (
            <Card className={'person-card mb-' + this.props.mb} bg="dark">
                <Card.Header className="d-flex">
                    <div className="flex-grow-1">
                        {person.nachname || <em>Nachname</em>} {person.vorname || <em>Vorname</em>}
                    </div>
                    <div>
                        {allowDelete &&
                            <Button type="button"
                                    onClick={onDelete}
                                    variant="link"
                                    size="sm"
                                    title="löschen">
                                <FontAwesomeIcon icon="trash"/>
                            </Button>}
                        <Button type="button" onClick={onEdit} variant="link" size="sm" title="bearbeiten">
                            <FontAwesomeIcon icon="pencil"/>
                        </Button>
                    </div>
                </Card.Header>
                {(errorMessages || quickFacts) && <Card.Body>
                    {quickFacts && quickFacts.map(quickFact => <div className="person-card__quickfact text-light">
                        <FontAwesomeIcon icon={quickFact.icon} fixedWidth className="text-white" /> {quickFact.text}
                    </div>)}

                    {errorMessages && errorMessages.map(error => <div className="person-card__error">
                        <FontAwesomeIcon icon="warning" fixedWidth /> {error.toString()}
                    </div>)}
                </Card.Body>}
                <div>

                </div>


            </Card>
        )
    }

    polishErrors(errors) {
        let errorMessages = false;

        if (errors) {
            errorMessages = [];

            let keys = Object.keys(errors);

            keys.forEach(key => {
                let error = errors[key];

                if (typeof error === 'string') {
                    errorMessages.push(error);
                } else {
                    let keys2 = Object.keys(error);
                    keys2.forEach(key2 => {
                        errorMessages.push(error[key2]);
                    });
                }

            });


            // Consoliate missing fields into one global error
            const countBeforeRemovingRequiredFieldErrors = errorMessages.length;
            errorMessages = errorMessages.filter(message => !(message.indexOf('ist erforderlich') !== -1));
            const countAfterRemovingRequiredFieldErrors = errorMessages.length;

            if (countAfterRemovingRequiredFieldErrors < countBeforeRemovingRequiredFieldErrors) {
                errorMessages.push('Es sind nicht alle Pflichtfelder ausgefüllt');
            }

            // Hide Invalid date error
            errorMessages = errorMessages.filter(message => !(message.indexOf('Invalid Date') !== -1))


            if (errorMessages.length === 0) {
                errorMessages = false;
            }
        }

        return errorMessages;
    }

    getQuickFacts(person, values) {
        const quickFacts = [];

        if (person.geburtsdatum && moment(person.geburtsdatum).isAfter('2005-06-11')) {
            quickFacts.push({
                icon: 'baby-carriage',
                text: 'minderjährig'
            })
        }

        if (person.aufsichtsperson) {
            let aufsichtsperson = getReferencedPersonByUuid(values, person.aufsichtsperson);
            quickFacts.push({
                icon: 'person',
                text: 'Aufsichtsperson: ' + (aufsichtsperson.vorname || '[Vorname]') + ' ' + (aufsichtsperson.nachname || '[Nachname]')
            })
        }

        if (person.geschwisterkind) {
            let geschwisterkind = getReferencedPersonByUuid(values, person.geschwisterkind);
            quickFacts.push({
                icon: 'people-pulling',
                text: 'Geschwisterkind: ' + (geschwisterkind.vorname || '[Vorname]') + ' ' + (geschwisterkind.nachname || '[Nachname]')
            })
        }

        let beaufsichtigtePersonen = getReferencingPeople(values, person.id);

        if (beaufsichtigtePersonen.length > 0) {
            quickFacts.push({
                icon: 'glasses',
                text: 'Aufsichtsperson für ' + beaufsichtigtePersonen.length + ' Teilnehmer*in'+ (beaufsichtigtePersonen.length > 1 ? 'nen' : '')
            });
        }

        if (person.anreise && !person.anreise.mit_gruppe) {
            let ankunft = moment(person.anreise.ankunft);
            let abfahrt = moment(person.anreise.abfahrt)
            let typLabel = {'selbststaendig' : 'selbstständig', 'mit_dv': 'mit DV'}[person.anreise.typ] || '';
            let zielLabel = {'direkt' : 'direkt zum Zeltplatz', 'zug_allersberg': 'mit dem Zug nach Allersberg', 'zug_hilpoltstein': 'mit dem Zug nach Hilpoltstein'}[person.anreise.ziel] || '';

            quickFacts.push({
                icon: 'car',
                text: 'Anreise: ' + ankunft.format('dd. H:mm') + ' Uhr an, ' + abfahrt.format('dd. H:mm') + ' Uhr ab, ' + typLabel + ', ' + zielLabel,
            });
        }

        return quickFacts.length === 0 ? false : quickFacts;
    }
}

export default PersonCard;