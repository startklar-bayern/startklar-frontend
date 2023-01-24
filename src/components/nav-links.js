import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import './../assets/styles/navbar.scss';
import { Link } from "react-scroll";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

const NavLinks = () => {
  return (
    <Nav>
      <Link className="nav-link" to="home" spy={true} smooth={true} offset={0} duration={50}>Countdown</Link>
      <Link className="nav-link" to="faq" spy={true} smooth={true} offset={50} duration={50}>FAQs</Link>
      <Link className="nav-link" to="schedule" spy={true} smooth={true} offset={50} duration={50}>Zeitplan</Link>
      <Link className="nav-link" to="workshops" spy={true} smooth={true} offset={50} duration={50}>Workshops</Link>
      <Link className="nav-link" to="sharepics" spy={true} smooth={true} offset={50} duration={50}>Bewerben</Link>
      <Link className="nav-link" to="news" spy={true} smooth={true} offset={50} duration={50}>News</Link>
      <Link className="nav-link" to="newsletter" spy={true} smooth={true} offset={-100} duration={50}>Newsletter</Link>
      <Link className="nav-link" to="contact-persons" spy={true} smooth={true} offset={50} duration={50}>AGs</Link>
      <Link className="nav-link nav-arrow d-lg-none" to="footer" spy={true} smooth={true} offset={50} duration={50}><FontAwesomeIcon icon={faAngleDown}/></Link>
    </Nav>
  )
};

export default NavLinks