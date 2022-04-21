import React, {Component} from "react";
import CookieConsent, {getCookieConsentValue} from "react-cookie-consent";
import OpengraphReactComponent from "opengraph-react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from "../layouts/footer";
import {Home} from "../pages";
import Page from "../pages/page";
import ReactGA from "react-ga4";

export default class App extends Component {
    state = {
        pages: [],
    }

    constructor(props) {
        super(props);

        fetch('https://backend.startklar.bayern/api/pages')
            .then(response => response.json())
            .then(pages => {
                this.setState({
                    pages: pages,
                })
            });

        this.handleAcceptCookie = this.handleAcceptCookie.bind(this);
        this.initGoogleAnalytics = this.initGoogleAnalytics.bind(this);
    }

    componentDidMount() {
        const isConsent = getCookieConsentValue();
        if (isConsent) {
            this.initGoogleAnalytics();
        }
    }

    render() {
        return (
            <div>
                <CookieConsent
                    location="bottom"
                    buttonText="Akzeptieren"
                    enableDeclineButton
                    declineButtonText="Ablehnen"
                    onAccept={this.handleAcceptCookie}
                >Diese Website verwendet Cookies um die Erfahrung zu verbessern.</CookieConsent>

                <OpengraphReactComponent
                    site={window.location.href}
                    appId={'35367279-d3e6-466d-a5dc-8c137f9094c0'}
                    size={'small'}
                />

                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {this.state.pages.map(page => {
                            return (<Route key={'page-' + page.id} path={page.path} element={<Page page={page}/>}/>)
                        })}
                    </Routes>
                    <Footer pages={this.state.pages}/>
                </Router>
            </div>
        )
    }

    handleAcceptCookie() {
        this.initGoogleAnalytics();
    }

    initGoogleAnalytics() {
        ReactGA.initialize("G-EG3P2MR6NY", {
            testMode: window.location.host !== "www.startklar.bayern",
        });

        ReactGA.send("pageview");
    }
}