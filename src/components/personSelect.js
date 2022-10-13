import React from "react";
import {Form, InputGroup, Overlay, Tooltip} from "react-bootstrap";
import moment from "moment";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class PersonSelect extends React.Component {
    infoTarget = React.createRef();

    state = {
        showInfo: false
    }

    render() {
        const {
            label,
            emptyLabel,
            required,
            name,
            value,
            values,
            personId,
            onChange,
            onBlur,
            isInvalid,
            errors,
            maxBirthday
        } = this.props;

        return (
            <Form.Group className="mb-3">
                <Form.Label>{label}{required ? ' *' : ''}</Form.Label>
                <InputGroup>
                    <Form.Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={isInvalid}>
                        <option value="">- {emptyLabel ? emptyLabel : 'Auswählen'} -</option>
                        {this.getAvailablePeople(values, personId, maxBirthday).map(person => <option value={person.id} key={person.id}>{person.nachname || "(Nachname"} {person.vorname || "Vorname)"}</option>)}
                    </Form.Select>

                    <Button variant="outline-secondary" ref={this.infoTarget}
                            onClick={() => this.setState({showInfo: !this.state.showInfo})}>
                        <FontAwesomeIcon icon="info-circle"/>
                    </Button>

                    <Overlay target={this.infoTarget.current}
                             show={this.state.showInfo}>
                        {(props) => (
                            <Tooltip {...props}>
                                {this.props.infoText}
                            </Tooltip>
                        )}
                    </Overlay>

                    <Form.Control.Feedback type="invalid">
                        {errors}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        )
    }

    getAvailablePeople(values, self, maxBirthday) {

        let people = [values.leitung];
        people.push(...values.teilnehmer);

        people = people.filter(value => value !== null);
        people = people.filter(value => value?.id !== self);

        if (maxBirthday) {
            people = people.filter(value => moment(value?.geburtsdatum).isSameOrBefore(maxBirthday));
        }

        people.sort((a,b) => a.nachname?.localeCompare(b.nachname) || a.vorname?.localeCompare(b.vorname));

        return people;
    }
}