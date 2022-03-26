import React from 'react'
import './../assets/styles/sharepics.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import ShareButton from "./shareButton";

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h2>Spread the word</h2></center>
            <p className="text-light text-center">Lorem Ipsum dolor sit amet et consetutor, sadipscing elitr, sed diam nonumy eirmod empor ividunt ut labore et dolore magna aliquyam.</p>
            <Row className="mb-4">
                {sharepics.map((sharepic) => (
                    <Col xs={6} lg={3} key={'sharepic-' + sharepic.id}>
                        <img src={sharepic.imagePreviewUrl} alt={sharepic.altText} />
                        <ShareButton
                            image={sharepic.imageShareUrl}
                            previewImage={sharepic.imagePreviewUrl}
                            text={sharepic.body}
                            title="Ich bin Startklar!"
                            id={sharepic.id}
                            altText={sharepic.altText} />
                    </Col>
                ))}
            </Row>
            <h6 className="follow-us text-center">Folge uns Auf: <a href="https://www.instagram.com/startklar.bayern" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a><a rel="noreferrer" href="https://www.facebook.com/startklar.bayern" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a></h6>
        </div>
    )
};

export default Sharepics
