import React from "react";
import {Container, Row, Col}  from 'react-bootstrap'
import Form from "@rjsf/core";
import './../../assets/styles/forms.scss';
import registrationSchema from '../../assets/json/registrationSchema.json';
import registrationUiSchema from '../../assets/json/registrationUiSchema.json';
import classNames from 'classnames'
import { useParams, useLocation } from "react-router-dom";
import {withSupportChat} from "../../hoc/withSupportChat";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation().search} />;
}

class EditGroup extends React.Component {
    state = {
        formDataTemp: []
    }
    handleSubmit = ({formData}, e) => {
        fetch(this.GetPath(), {
            method: 'put',
            body: JSON.stringify({formData}),
            headers: {
                'Authorization': 'Bearer ' + this.GetToken()
            }
        })
            .then(response => response.json())
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = ({formData}, e) => {
        this.setState({
            formDataTemp: {formData}
        });
    }

    componentDidMount() {
        fetch(this.GetPath(), {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.GetToken()
            }
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    formDataTemp: data
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        setInterval(() => {
            let formData = this.state.formDataTemp;

            fetch(this.GetPath(), {
                method: 'put',
                body: JSON.stringify(formData),
                headers: {
                    'Authorization': 'Bearer ' + this.GetToken()
                }
            })
                .then(response => response.json())
                .catch(function (error) {
                    console.log(error);
                })
        }, 10000);
    }

    render() {
        const log = (type) => console.log.bind(console, type);

        return (
            <div className="registration">
                <Container>
                    <Row>
                        <Col>
                            <h1>Anmeldung</h1>
                            <Form schema={registrationSchema}
                                uiSchema={registrationUiSchema}
                                onSubmit={this.handleSubmit}
                                onChange={this.handleChange}
                                onError={log("errors")}
                                formData={this.state.formDataTemp.formData}
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

    GetToken(){
        return new URLSearchParams(this.props.location).get("token");
    }

    GetPath(endpoint = "tempStorage"){
        return 'https://backend.startklar.bayern/api/anmeldung/' + endpoint + '/' + this.props.params.groupId;
    }
}

export default withSupportChat(withParams(EditGroup))