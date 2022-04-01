import React from 'react'
import {Col, Row, Accordion} from 'react-bootstrap'
import './../assets/styles/faq.scss';

const FaqAccordion = ({faqs}) => {
    return (
        <Row>
            <Col>
                <center><h2 className="mb-4">Häufig gestellte Fragen</h2></center>
                <Accordion className="mb-4 row">
                    <Col md={6}>
                        {faqs.map((faq, index) => (
                            index % 2 === 0 &&
                                <Accordion.Item eventKey={faq.id} key={'faq-' + faq.id}>
                                    <Accordion.Header>{faq.question}</Accordion.Header>
                                    <Accordion.Body dangerouslySetInnerHTML={{__html: faq.answer}}>
                                    </Accordion.Body>
                                </Accordion.Item>
                        ))}
                    </Col>
                    <Col md={6}>
                        {faqs.map((faq, index) => (
                            index % 2 !== 0 &&
                                <Accordion.Item eventKey={faq.id} key={'faq-' + faq.id}>
                                    <Accordion.Header>{faq.question}</Accordion.Header>
                                    <Accordion.Body dangerouslySetInnerHTML={{__html: faq.answer}}>
                                    </Accordion.Body>
                                </Accordion.Item>
                        ))}
                    </Col>
                </Accordion>
            </Col>
        </Row>
    )
};

export default FaqAccordion