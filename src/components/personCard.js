import React from "react";
import {type} from "@testing-library/user-event/dist/type";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class PersonCard extends React.Component {
    state = {}

    render() {
        let {allowDelete, onDelete, onEdit, errors} = this.props;
        let person = this.props.person;


        const errorMessages = this.polishErrors(errors);


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
                <Card.Body>
                    {errorMessages && errorMessages.map(error => <div className="person-card__error">
                        <FontAwesomeIcon icon="warning" /> {error.toString()}
                    </div>)}
                </Card.Body>
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
}

export default PersonCard;