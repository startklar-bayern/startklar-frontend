import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './../assets/styles/navbar.scss';

export default function StartklarNavbar() {
  const [stickyClass, setStickyClass] = useState('main-nav-bottom');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {

      var node = document.getElementById("main-nav");
      var mainNavOffset = ReactDOM.findDOMNode(node).offsetTop;

      let windowHeight = window.scrollY;
      windowHeight > mainNavOffset ? setStickyClass('main-nav-top') : setStickyClass('main-nav-bottom');
    }
  };

  return (
    <Navbar id="main-nav" className={`main-nav ${stickyClass}`} variant="dark" expand="lg" bg="black" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Countdown</Nav.Link>
            <Nav.Link href="#faq">FAQs</Nav.Link>
            <Nav.Link href="#schedule">Zeitplan</Nav.Link>
            <Nav.Link href="#sharepics">Bewerben</Nav.Link>
            <Nav.Link href="#news">News</Nav.Link>
            <Nav.Link href="#newsletter">Newsletter</Nav.Link>
            <Nav.Link href="#contact-persons">AGs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
