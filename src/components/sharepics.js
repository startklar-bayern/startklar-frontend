import React from 'react'
import './../assets/styles/sharepics.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h2>Spread the word</h2></center>
            <p className="text-light text-center">Lorem Ipsum dolor sit amet et consetutor, sadipscing elitr, sed diam nonumy eirmod empor ividunt ut labore et dolore magna aliquyam.</p>
            <Row className="mb-4">
                {sharepics.map((sharepic) => (
                    <Col xs={6} lg={3} key={'sharepic-' + sharepic.id}>
                        <img src={sharepic.imagePreviewUrl} alt={sharepic.altText} />
                        <a href={sharepic.imageShareUrl} target="_blank" rel="noreferrer">
                            <Button className="share-button" variant="primary">Teilen <FontAwesomeIcon icon={faShare} /></Button>{' '}
                        </a>
                        <div dangerouslySetInnerHTML={{__html: sharepic.body}}/>
                    </Col>
                ))}
            </Row>
            <h6 className="follow-us text-center">Folge uns Auf: <a href="https://www.instagram.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a><a rel="noreferrer" href="https://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a></h6>
        </div>
    )
};

export default Sharepics