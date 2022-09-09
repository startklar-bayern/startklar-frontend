import React from "react";
import {Container, Row, Col, Button, Form, InputGroup}  from 'react-bootstrap'
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {withSupportChat} from "../../hoc/withSupportChat";

class CreateGroup extends React.Component {
  state = {
    mail: '',
  }

  handleChange = event => {
    this.setState({ mail: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const group = {
      "mail": this.state.mail,
      "participant_privacy_accepted": true,
      "privacy_accepted": true
    };

    axios
      .post('https://backend.startklar.bayern/api/anmeldung/group', group)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
        <div className="createGroup">
            <Container>
                <Row>
                    <Col>
                      <h1>Gruppe erstellen</h1>
                      <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                          <Form.Control
                            type="email"
                            name="mail"
                            placeholder="E-Mail Adresse"
                            aria-label="E-Mail Adresse"
                            aria-describedby="E-Mail Adresse"
                            onChange={this.handleChange}
                          />
                          <Button type="submit">Erstellen <FontAwesomeIcon icon={faArrowRight}/></Button>
                        </InputGroup>
                      </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}

export default withSupportChat(CreateGroup);