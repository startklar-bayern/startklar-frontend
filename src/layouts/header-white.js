import React from "react";
import logo from './../assets/images/logo-optisch-zentriert.svg';
import logoKolpingBayernWeiss from './../assets/images/logo-kolping-bayern-weiß.svg';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";
import {Row, Col, Navbar, Container}  from 'react-bootstrap'
import SocialButtons from '../components/socialButtons';

function HeaderWhite() {
  return (
    <Container fluid>
      <Navbar>
        <Row className="header header-white">
          <Col xs={2} md={4} className="seondary-brand text-center color-white">
            <img className="d-none d-sm-inline-block" src={logoKolpingBayernWeiss} alt="Logo Kolpingjugend Bayern" />
          </Col>
          <Col xs={8} md={4} className="text-center color-white">
            <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="Logo" width="388" height="388" className="header__logo"/>
            </NavLink>
          </Col>
          <Col xs={2} md={4} className="text-center color-white">
            <SocialButtons/>
          </Col>
        </Row>
      </Navbar>
    </Container>
  );
}

export default HeaderWhite