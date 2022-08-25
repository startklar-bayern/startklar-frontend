import React, {Component} from "react";
import {Container, Row, Col}  from 'react-bootstrap'
import Form from "@rjsf/core";
import './../assets/styles/forms.scss';
import registrationSchema from '../assets/json/registrationSchema.json';
import registrationUiSchema from '../assets/json/registrationUiSchema.json';
import classNames from 'classnames'
import axios from 'axios'

class Registration extends Component {
    state = {
        group: []
    }

    componentDidMount() {
        axios
            .get('https://backend.startklar.bayern/api/anmeldung/group/Tatkraft-157', {
                /* headers: {
                    "Access-Control-Allow-Origin": "*"
                    // Authorization: 'Bearer ' + token
                } */
            })
            .then(res => {
                const group = res.data;
                this.setState({ group });
            })
    }

    render() {
        const log = (type) => console.log.bind(console, type);

        console.log(this.state.group);

        return (
            <div className="registration">
                <Container>
                    <Row>
                        <Col>
                            <h1>Anmeldung</h1>
                            <ul>
                                { this.state.group.map(person => <li>{person.name}</li>)}
                            </ul>
                            <Form schema={registrationSchema}
                                uiSchema={registrationUiSchema}
                                onChange={log("changed")}
                                onSubmit={log("submitted")}
                                onError={log("errors")}
                                ObjectFieldTemplate={this.ObjectFieldTemplate}
                                ArrayFieldTemplate={this.ArrayFieldTemplate} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    ObjectFieldTemplate ({ properties, title, description }) {
        return (
            <div>
                <Row>
                    <Col>
                        <h3>{title}</h3>
                        {description}
                    </Col>
                </Row>
                <Row>
                    {properties.map(prop => {
                        const uiSchema = prop.content.props.uiSchema
                        const className = classNames('property-wrapper', uiSchema['ui:column'] || 'col-sm-12')
                        return <Col key={prop.content.key} className={className}>
                            {prop.content}
                        </Col>
                    })}
                </Row>
            </div>
        )
    }

    ArrayFieldTemplate(props) {
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h3>{props.title}</h3>
                            {props.description}
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            {props.items.map(element => {
                                return (
                                    <div className="array-item">
                                        <div>{element.children}</div>

                                        {element.hasRemove && <button type="button" className="btn btn-danger" onClick={element.onDropIndexClick(element.index)}>Entfernen</button>}
                                    </div>
                                )
                            })}
                            {props.canAdd && <button type="button" className="btn btn-primary" onClick={props.onAddClick}>Hinzufügen</button>}
                        </div>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Registration