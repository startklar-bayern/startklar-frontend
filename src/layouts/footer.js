import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import BjrLogo from './../assets/images/foerderung/BJR.svg';
import StMasLogo from './../assets/images/foerderung/StMAS.jpg';
import NavLinks from '../components/nav-links';
import Navbar from 'react-bootstrap/Navbar';
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
                    <Navbar id="footer-nav" className="footer-nav d-lg-none" variant="dark" bg="black" >
                        <NavLinks />
                    </Navbar>
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
                    <div className="footer-foerderung text-center text-black bg-white">
                        <div>Gefördert durch den</div>
                        <img height="75" src={BjrLogo} alt="BJR Logo" />
                        <div>aus Mitteln des Kinder- und Jugendprogramms des</div>
                        <img src={StMasLogo} height="50" alt="StMAS Logo" />
                    </div>
                </footer>
            </Container>
        );
    }
}
