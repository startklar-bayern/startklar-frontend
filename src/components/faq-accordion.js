import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './../assets/styles/faq.scss';

const FaqAccordion = ({faqs}) => {
    return (
        <Row>
            <Col>
                <center><h1>Häufig gestellte Fragen</h1></center>
                <Accordion className="row">
                    {faqs.map((faqs) => (
                        <Accordion.Item eventKey={faqs.id} className="col-12 col-md-6">
                            <Accordion.Header>{faqs.question}</Accordion.Header>
                            <Accordion.Body>
                                {faqs.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>
        </Row>
    )
};

export default FaqAccordion