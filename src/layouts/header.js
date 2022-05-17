import React from "react";
import logo from './../assets/images/logo-optisch-zentriert.png';
import logoWebP from './../assets/images/logo-optisch-zentriert.webp';
import logoKolpingBayern from './../assets/images/logo-kolping-bayern.svg';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";
import {Row, Col, Navbar, Container}  from 'react-bootstrap'
import SocialButtons from '../components/socialButtons';

function Header() {
  return (
    <Container fluid>
      <Navbar>
        <Row className="header">
          <Col xs={2} md={4} className="seondary-brand text-center">
            <img className="d-none d-sm-inline-block" src={logoKolpingBayern} alt="Logo Kolpingjugend Bayern" />
          </Col>
          <Col xs={8} md={4} className="text-center">
            <NavLink className="navbar-brand" to="/">
              <picture>
                <source srcSet={logoWebP} type="image/webp" />
                <source srcSet={logo} type="image/png" />
                <img src={logo} alt="Logo" width="388" height="388" className="header__logo"/>
              </picture>
            </NavLink>
          </Col>
          <Col xs={2} md={4} className="text-center">
            <SocialButtons/>
          </Col>
        </Row>
      </Navbar>
    </Container>
  );
}

export default Header