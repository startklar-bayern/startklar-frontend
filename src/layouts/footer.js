import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import BjrLogo from './../assets/images/foerderung/BJR.svg';
import StMasLogo from './../assets/images/foerderung/StMAS.jpg';
import LigaBankLogo from './../assets/images/foerderung/Liga_Bank_logo.svg';
import KolpingRecyclingLogo from './../assets/images/foerderung/Kolping_Recycling_Logo.jpg';
import MayingerLogo from './../assets/images/foerderung/mayinger-logo.png';
import './../assets/styles/footer.scss';

export default class Footer extends Component {
    render() {
        const links = this.props.pages
            .map(page => {
                if (page.menuLinks === undefined || page.menuLinks.length === 0) {
                    return false;
                }

                let data;

                page.menuLinks.forEach(link => {
                    if (data) {
                        return;
                    }

                    if (link.menu === 'footer') {
                        data = {
                            id: page.id,
                            path: page.path,
                            title: link.title,
                            weight: link.weight,
                        }
                    }
                });

                if (!data) {
                    return false;
                }

                return data;
            })
            .filter(item => item)
            .sort((a, b) => {
                return a.weight - b.weight
            });

        const currentYear = new Date().getFullYear()

        return (
            <Container className="footer">
                <footer>
                    <div className="footer-border">
                        <div className="xsmall"/>
                        <div className="small"/>
                        <div className="large"/>
                        <div className="small"/>
                        <div className="xsmall"/>
                    </div>
                    <div className="navigation-container">
                        <div className="text-light">© Kolpingjugend im Kolpingwerk Bayern {currentYear}</div>
                        <div className="navigation">
                            <nav className="navbar navbar-expand">
                                <ul className="navbar-nav ml-auto">
                                    {links.map(link => {
                                        return ( <li className="nav-item" key={'menu-link-' + link.id}>
                                            <NavLink className="nav-link" to={link.path}>
                                                {link.title}
                                            </NavLink>
                                        </li>)
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <Row className="footer-foerderung text-center text-black bg-white p-4 mb-5 align-items-center">
                        <Col lg={6}>
                            <div>Gefördert durch den</div>
                            <img height="75" src={BjrLogo} alt="BJR Logo" />
                            <div>aus Mitteln des Kinder- und Jugendprogramms des</div>
                            <img src={StMasLogo} height="50" alt="StMAS Logo" />
                        </Col>
                        <Col lg={6}>
                            <h6 className="my-4 mt-lg-0">Danke für die Spenden:</h6>

                            <a href="https://www.kolping-textilrecycling.de" target="_blank"><img className="mx-4 mb-1" src={KolpingRecyclingLogo} height="100" alt="Kolping Recycling Logo" /></a>
                            <a href="https://www.ligabank.de" target="_blank"><img className="mx-4 mb-1" src={LigaBankLogo} height="75" alt="Liga Bank Logo" /></a>
                            <a href="https://www.mayinger-bestattungen.de" target="_blank"><img className="mx-4 mb-1" src={MayingerLogo} height="75" alt="Mayinger Bestattungen Logo" /></a>
                        </Col>
                    </Row>
                </footer>
            </Container>
        );
    }
}
