import React, {Component} from 'react'
import './../assets/styles/sharepics.scss';
import {Col, Row} from 'react-bootstrap'
import ShareButton from "./shareButton";
import SocialButtons from './socialButtons';

export default class Sharepics extends Component {
    render() {
        const sharepics = this.props.sharepics;

        return (
            <div>
                <center><h2 className="mb-4">Spread the word</h2></center>
                <div className="mb-4">
                    <p className="text-light text-center">
                        So ein Großevent lebt davon dass viele Leute dabei sind. Und da bist DU gefragt!</p>
                    <p className="text-light text-center">Suche dir ein oder mehrere Sharepics aus und versende sie an deine Freund*innen oder teile sie in
                        den sozialen Netzwerken.</p>
                    <p className="text-light text-center"> Unter den Sharepics findest du noch Links zum offiziellen Instagram- und Facebook-Profil. Diesen
                        Accounts kannst du gerne folgen um keine News zu verpassen.
                        Gemeinsam machen wir STARTKLAR zu einem unvergesslichen Erlebnis.
                    </p>
                </div>

                <Row className="mb-4">
                    {sharepics.map((sharepic) => (
                        <Col xs={6} lg={3} key={'sharepic-' + sharepic.id} className="my-4">
                            <img className="sharepic" src={sharepic.imagePreviewUrl} alt={sharepic.altText} width="200" height="200" loading="lazy"/>
                            <ShareButton
                                image={sharepic.imageShareUrl}
                                previewImage={sharepic.imagePreviewUrl}
                                title={sharepic.title}
                                text={sharepic.body}
                                id={sharepic.id}
                                altText={sharepic.altText}/>
                        </Col>
                    ))}
                </Row>

                <h6 className="follow-us text-center">
                    Folge uns Auf: <SocialButtons/>
                </h6>
            </div>
        );
    }
}
