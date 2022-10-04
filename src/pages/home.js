import React, {Component} from 'react';
import './../assets/styles/home.scss';
import Sharepics from '../components/sharepics';
import News from '../components/news';
import ContactPersons from '../components/contact-persons';
import FaqAccordion from '../components/faq-accordion';
import FaqQuestion from '../components/faq-question';
import Newsletter from '../components/newsletter';
import Calendar from '../components/calendar';
import {Row, Col, Container}  from 'react-bootstrap'
import {Toast} from "react-bootstrap";
import backgroundWebP from "../assets/images/mountain-silhoutte-background__1x.webp"
import backgroundPng from "../assets/images/mountain-silhoutte-background__1x.png"
import backgroundWebP2x from "../assets/images/mountain-silhoutte-background__2x.webp"
import backgroundPng2x from "../assets/images/mountain-silhoutte-background__2x.png"

class Home extends Component {
    constructor(props) {
        super(props);
        this.closeToast = this.closeToast.bind(this);
    }

    render() {
        return (
            <div>
                <section className="home container-fluid">
                    <picture className="home__background">
                        <source srcSet={backgroundWebP + " 1x, " + backgroundWebP2x + " 2x"} type="image/webp" />
                        <source srcSet={backgroundPng + " 1x, " + backgroundPng2x + " 2x"} type="image/png" />
                        <img src={backgroundPng} alt="" className="home__background__image" />
                    </picture>
                    <Container>
                        <Row>
                            <Col lg={{ span: 8, offset: 2 }}>
                                <Calendar/>
                                <Newsletter/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="gradient-container">
                    <section className="faqs" id="faq">
                        <Container>
                            <FaqAccordion faqs={this.state.faqs}/>
                            <FaqQuestion/>
                        </Container>
                    </section>
                    <section className="sharepics">
                        <Container>
                            <Sharepics sharepics={this.state.sharepics}/>
                        </Container>
                    </section>
                </div>
                <div className="gradient-reverse-container">
                    <section className="news">
                        <Container>
                            <News news={this.state.news}/>
                        </Container>
                    </section>
                    <section className="contact-persons">
                        <Container>
                            <ContactPersons contactPersons={this.state.contactPersons}/>
                        </Container>
                    </section>
                </div>
                <Toast show={this.state.showEmailConfirmed} style={{top: '1em', right: '1em', position: 'absolute', zIndex: 10000}} onClose={this.closeToast}>
                    <Toast.Header>
                        <strong className="me-auto">E-Mail bestätigt</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Du erhältst in Zukunft alle Neuigkeiten zu STARTKLAR.
                    </Toast.Body>
                </Toast>
            </div>
        )
    }

    state = {
        sharepics: [],
        faqs: [],
        news: [],
        contactPersons: [],
        showEmailConfirmed: false,
    };

    componentDidMount() {
        fetch('https://backend.startklar.bayern/api/sharepics')
            .then(res => res.json())
            .then((data) => {
                this.setState({sharepics: data})
            })
            .catch(console.log)
        fetch('https://backend.startklar.bayern/api/faqs')
            .then(res => res.json())
            .then((data) => {
                this.setState({faqs: data})
            })
            .catch(console.log)

        fetch('https://backend.startklar.bayern/api/news')
            .then(res => res.json())
            .then((data) => {
                this.setState({news: data})
            })
            .catch(console.log)

        fetch('https://backend.startklar.bayern/api/ags')
            .then(res => res.json())
            .then((data) => {
                this.setState({contactPersons: data})
            })
            .catch(console.log)

        // Display toast when email was confirmed.
        const currentUrl = new URL(window.location);
        if (currentUrl.search.indexOf('emailConfirmed') !== -1) {
            this.setState({
                showEmailConfirmed: true,
            });
        }
    }

    closeToast() {
        this.setState({showEmailConfirmed: false});

        const url = new URL(window.location);
        url.searchParams.delete('emailConfirmed');

        window.history.pushState({}, document.title, url.toString());
    }
}

export default Home