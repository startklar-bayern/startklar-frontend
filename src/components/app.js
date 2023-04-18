import React, {Component} from "react";
import CookieConsent, {getCookieConsentValue} from "react-cookie-consent";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Footer} from "../layouts";
import {Home} from "../pages";
import Page from "../pages/page";
import CreateGroup from "../pages/registration/createGroup";
import AnmeldungAuswahl from "../pages/registration/anmeldungAuswahl";
import AnmeldungInfo from "../pages/registration/anmeldungInfo";
import EditGroup from "../pages/registration/editGroup";
import ReactGA from "react-ga4";
import AnmeldungSuccess from "../pages/registration/anmeldungSuccess";
import PageNotFound from "../pages/pageNotFound";
import {HelmetProvider} from "react-helmet-async";
import ScrollToTop from "./scrollToTop";
import AnmeldungHelferInfo from "../pages/registration/anmeldungHelferInfo";
import CreateHelfer from "../pages/registration/createHelfer";
import EditHelfer from "../pages/registration/editHelfer";
import AnmeldungHelferSuccess from "../pages/registration/anmeldungHelferSuccess";
import {API_BASE_URL} from "../constants";

class App extends Component {
    state = {
        pages: [],
        headerWhite: false,
    }

    constructor(props) {
        super(props);

        fetch(API_BASE_URL  + 'pages')
            .then(response => response.json())
            .then(pages => {
                this.setState({
                    pages: pages,
                })
            });

        this.handleAcceptCookie = this.handleAcceptCookie.bind(this);
        this.initGoogleAnalytics = this.initGoogleAnalytics.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    componentDidMount() {
        const isConsent = getCookieConsentValue();
        if (isConsent) {
            this.initGoogleAnalytics();
        }

        window.history.pushState = (f => function pushState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        })(window.history.pushState);

        window.history.replaceState = (f => function replaceState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('locationchange'));
            return ret;
        })(window.history.replaceState);

        window.addEventListener('popstate', function () {
            window.dispatchEvent(new Event('locationchange'))
        });

        window.addEventListener('locationchange', this.onLocationChange);
    }

    onLocationChange() {
        this.setState({
            headerWhite: window.location.url !== '/'
        })
    }

    render() {


        return (
            <div>
                <HelmetProvider>
                    <CookieConsent
                        location="bottom"
                        buttonText="Akzeptieren"
                        enableDeclineButton
                        declineButtonText="Ablehnen"
                        onAccept={this.handleAcceptCookie}
                        disableStyles="true"
                        containerClasses="alert row bg-dark text-white"
                        contentClasses="col-md-auto"
                        buttonClasses="btn btn-primary py-1 px-3"
                        declineButtonClasses="btn btn-small btn-secondary me-3 py-1 px-3"
                        buttonWrapperClasses="col-md text-md-end mt-2 mt-md-0"
                    >Diese Website verwendet Cookies um die Erfahrung zu verbessern.</CookieConsent>

                    <Router>
                        <ScrollToTop/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            {this.state.pages.map(page => {
                                return (<Route key={'page-' + page.id} path={page.path} element={<Page page={page}/>}/>)
                            })}
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                        <Footer pages={this.state.pages}/>
                    </Router>
                </HelmetProvider>
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

export default App;