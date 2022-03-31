import React, {Component} from 'react';
import './../assets/styles/home.scss';
import Sharepics from '../components/sharepics';
import FaqAccordion from '../components/faq-accordion';
import FaqQuestion from '../components/faq-question';
import Newsletter from '../components/newsletter';
import Calendar from '../components/calendar';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Header from "../layouts/header";
import {Toast} from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
        this.closeToast = this.closeToast.bind(this);
    }

    render() {
        return (
            <div>
                <section className="home container-fluid">
                    <Header/>
                    <Container>
                        <Row>
                            <Col lg={{ span: 8, offset: 2 }}>
                                <Calendar/>
                                <Newsletter/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="faqs container" id="faq">
                    <FaqAccordion faqs={this.state.faqs}/>
                    <FaqQuestion/>
                </section>
                <section className="sharepics container">
                    <Sharepics sharepics={this.state.sharepics}/>
                </section>
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