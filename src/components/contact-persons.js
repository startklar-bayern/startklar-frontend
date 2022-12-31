import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import './../assets/styles/contact-persons.scss';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(iconList)

export default class ContactPersons extends Component {
    render() {
        const contactPersons = this.props.contactPersons;

        return (
            <div>
                <center><h2 className="mb-4">Wer steckt dahinter?</h2></center>
                <Row className="g-4">
                    {contactPersons.map((contactPerson) => (
                        <Col md={6} lg={4} key={'contact-person-' + contactPerson.id}>
                            <div className="contactPerson p-4 d-flex flex-column">
                                <div className="text-center"><FontAwesomeIcon className="contactPersonIcon text-center" icon={contactPerson.icon.replace("fa-","")} /></div>
                                <h3 className="text-center">{contactPerson.title}</h3>
                                <p className="text-light flex-grow-1" dangerouslySetInnerHTML={{__html: contactPerson.body}} />
                                <hr />
                                <div className="text-light">ANSPRECHPARTNER*IN: </div>
                                <h6>{contactPerson.contactName}</h6>
                                <div className="contactInfo mt-4">
                                    {contactPerson.contactMail &&
                                        <p><FontAwesomeIcon icon="paper-plane" /> <span><a href={"mailto:" + contactPerson.contactMail} >{contactPerson.contactMail}</a></span></p>
                                    }
                                    {contactPerson.contactPhone &&
                                        <p><FontAwesomeIcon icon="phone" /> <span><a href={"tel:" + contactPerson.contactPhone} >{contactPerson.contactPhone}</a></span></p>
                                    }
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}
