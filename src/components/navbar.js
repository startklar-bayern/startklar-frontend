import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './../assets/styles/navbar.scss';
import { Link } from "react-scroll";

export default class StartklarNavbar extends Component {
  state = {
    activeClass: 'main-nav-bottom'
  }

  constructor(props, context) {
      super(props, context);
  }

  render() {
    return (
      <Navbar id="main-nav" className={`main-nav ${this.state.activeClass}`} variant="dark" expand="lg" bg="black" >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="home" spy={true} smooth={true} offset={0} duration={50}>Countdown</Link>
              <Link className="nav-link" to="faq" spy={true} smooth={true} offset={50} duration={50}>FAQs</Link>
              <Link className="nav-link" to="schedule" spy={true} smooth={true} offset={50} duration={50}>Zeitplan</Link>
              <Link className="nav-link" to="sharepics" spy={true} smooth={true} offset={50} duration={50}>Bewerben</Link>
              <Link className="nav-link" to="news" spy={true} smooth={true} offset={50} duration={50}>News</Link>
              <Link className="nav-link" to="newsletter" spy={true} smooth={true} offset={-100} duration={50}>Newsletter</Link>
              <Link className="nav-link" to="contact-persons" spy={true} smooth={true} offset={50} duration={50}>AGs</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  componentDidMount(){
    let mainNavOffset = 0;
    let node = document.getElementById("main-nav");

    if(node){
      mainNavOffset = ReactDOM.findDOMNode(node).offsetTop;
    }

    window.addEventListener('scroll', () => {
      let activeClass = 'main-nav-top';
      if(window.scrollY < mainNavOffset){
          activeClass = 'main-nav-bottom';
      }
      this.setState({ activeClass });
    });
  }
}
