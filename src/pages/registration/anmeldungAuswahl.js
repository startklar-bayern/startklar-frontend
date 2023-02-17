import React from "react";
import {Card, Col, Container, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHammer, faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import {Helmet} from "react-helmet-async";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {HeaderWhite} from "../../layouts";

function withParams(Component) {
    return props => <Component {...props}
                               params={useParams()}
                               location={useLocation().search}
                               navigate={useNavigate()}/>;
}

class AnmeldungAuswahl extends React.Component {
    render() {
        const disableHelfer = false;

        return (
            <div className="anmeldungAuswahl">
                <Helmet>
                    <title>Anmeldung | STARTKLAR</title>
                </Helmet>

                <HeaderWhite />

                <Container>
                    <Row className="my-4">
                        <Col>
                            <h1 className="text-center">Anmeldung</h1>
                        </Col>
                    </Row>
                    <Row className="mb-4 align-items-stretch">
                        <Col className="text-center d-flex mb-4 mb-sm-0">
                            <Card className="bg-black border-light p-4 align-self-stretch flex-fill">
                                <NavLink to="/anmeldung-info">
                                    <FontAwesomeIcon icon={faPeopleGroup} size="6x" className="text-white my-4"/>
                                    <h2>Als Teilnehmer*in</h2>
                                </NavLink>
                            </Card>
                        </Col>
                        <Col className="text-center">
                            <Card className={'bg-black border-light p-4' + (disableHelfer ? ' opacity-25' : '')}>
                                <NavLink to={disableHelfer ? false : '/anmeldung-helfer-info'}>
                                    <FontAwesomeIcon icon={faHammer} size="6x" className="text-white my-4"/>
                                    <h2>Als Helfer*in</h2>
                                    {disableHelfer && <p>Wird bald freigeschaltet</p>}
                                </NavLink>
                            </Card>
                        </Col>
                    </Row>
                    {/*<Row className="mb-4">*/}
                    {/*  <Col>*/}
                    {/*    <a href="/">*/}
                    {/*      <Card>*/}
                    {/*        <h3 className="text-center">Schon angemeldet? Deine Anmeldung verwalten</h3>*/}
                    {/*      </Card>*/}
                    {/*    </a>*/}
                    {/*  </Col>*/}
                    {/*</Row>*/}
                </Container>
            </div>
        )
    }
}

export default withParams(AnmeldungAuswahl);