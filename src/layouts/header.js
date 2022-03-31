import React from "react";
import logo from './../assets/images/logo-optisch-zentriert.png';
import logoKolpingBayern from './../assets/images/logo-kolping-bayern.png';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import SocialButtons from '../components/socialButtons';

function Header() {
  return (
    <div class="container-fluid">
      <Navbar>
        <Row className="header">
          <Col xs={4} className="seondary-brand text-center">
            <img src={logoKolpingBayern} alt="Logo Kolpingjugend Bayern" />
          </Col>
          <Col xs={4} className="text-center">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </Col>
          <Col xs={4} className="text-center">
            <SocialButtons/>
          </Col>
        </Row>
      </Navbar>
    </div>
  );
}

export default Header