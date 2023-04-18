import React, {Component} from 'react';
import './../assets/styles/home.scss';
import Sharepics from '../components/sharepics';
import Workshops from '../components/workshops';
import News from '../components/news';
import ContactPersons from '../components/contact-persons';
import FaqAccordion from '../components/faq-accordion';
import StartklarNavbar from '../components/navbar';
import {Header} from "../layouts";
import Schedule from '../components/schedule';
import FaqQuestion from '../components/faq-question';
import Newsletter from '../components/newsletter';
import Calendar from '../components/calendar';
import {Col, Container, Row, Toast} from 'react-bootstrap'
import backgroundWebP from "../assets/images/mountain-silhoutte-background__1x.webp"
import backgroundPng from "../assets/images/mountain-silhoutte-background__1x.png"
import backgroundWebP2x from "../assets/images/mountain-silhoutte-background__2x.webp"
import backgroundPng2x from "../assets/images/mountain-silhoutte-background__2x.png"
import {Helmet} from "react-helmet-async";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import {API_BASE_URL} from "../constants";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>STARTKLAR Jugendfestival - Kolpingjugend Bayern</title>
                </Helmet>
                <div id="countdown">
                    <Header/>
                    <section className="home container-fluid">
                        <picture className="home__background">
                            <source srcSet={backgroundWebP + " 1x, " + backgroundWebP2x + " 2x"} type="image/webp"/>
                            <source srcSet={backgroundPng + " 1x, " + backgroundPng2x + " 2x"} type="image/png"/>
                            <img src={backgroundPng} alt="" className="home__background__image"/>
                        </picture>
                        <Container>
                            <Row>
                                <Col lg={{span: 8, offset: 2}}>
                                    <div className="text-center" style={{marginTop: '20%', marginBottom: '20%'}}>
                                        <h3>Das Jugendfestival wurde leider abgesagt</h3>
                                        <a href="#absage"><Button className="mt-3">Mehr Infos <FontAwesomeIcon
                                            icon="arrow-down"/></Button></a>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
                <section className="absage" id="absage" style={{paddingTop: 0}}>
                    <Container>
                        <Row className="">
                            <Col className="field-object p-4 fs-6">
                                <p>Liebe Teilnehmer*innen,<br/>
                                    liebe Helfer*innen,<br/>
                                    liebe Engagierte,</p>
                                <p> wir müssen euch leider schweren Herzens mitteilen, dass wir unser Jugendfestival
                                    “<strong>STARTKLAR - Spuren hinterlassen</strong>” vom 08. - 11. Juni 2023 absagen
                                    müssen.</p>

                                <p>Es ist der Landesleitung sehr schwer gefallen, diese Entscheidung zu treffen, aber
                                    aufgrund der zu geringen Anzahl von Teilnehmenden kann das Jugendfestival leider
                                    nicht stattfinden.<br/>
                                    Wir bedauern sehr, dass wir euch diese Nachricht überbringen müssen und verstehen,
                                    wenn ihr enttäuscht seid.</p>

                                <p>Trotzdem wollen wir uns bei euch dafür <strong>bedanken</strong>, dass ihr dabei
                                    gewesen wärt. Außerdem ein <strong>riesiges Dankeschön</strong> an alle, die sich im
                                    Vorfeld engagiert und Einsatz gezeigt haben, um das Jugendfestival auf die Beine zu
                                    stellen.</p>

                                <p>Wir hoffen, dass ihr auch bei zukünftigen Veranstaltungen der Kolpingjugend Bayern
                                    wieder <strong>#STARTKLAR</strong> seid und euch
                                    der <strong>#KolpingSpirit</strong> weiterhin antreibt.</p>

                                <p><strong>Treu Kolping und bis bald</strong><br/>
                                    <em>Die Landesleitung und die Projektgruppe “STARTKLAR”</em><br/><br/></p>

                                <p><small>P.S.: Eventuell findet ihr ja an diesem Wochenende eine spannende Alternative,
                                    bei der ihr mit eurer Gruppe <strong>Spuren hinterlassen</strong> und <strong>das
                                        Leben genießen</strong> könnt.</small></p>
                            </Col>
                        </Row>

                    </Container>
                </section>
            </div>
        )
    }
}

export default Home