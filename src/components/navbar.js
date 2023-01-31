import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-scroll";
import {Container, Navbar, Nav} from 'react-bootstrap';
import './../assets/styles/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default class StartklarNavbar extends Component {
  state = {
    activeClass: ''
  }

  constructor(props, context) {
      super(props, context);
  }

  render() {
    return (
      <Navbar id="main-nav" className={`main-nav ${this.state.activeClass}`} variant="dark" bg="black" expand="lg" >
        <Container>
          <Navbar.Toggle>
            <FontAwesomeIcon icon={faAngleDown} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link className="nav-link" to="countdown" spy={true} smooth={true} offset={0} duration={50}>Countdown</Link>
              <Link className="nav-link" to="faq" spy={true} smooth={true} offset={50} duration={50}>FAQs</Link>
              <Link className="nav-link" to="schedule" spy={true} smooth={true} offset={50} duration={50}>Zeitplan</Link>
              <Link className="nav-link" to="workshops" spy={true} smooth={true} offset={50} duration={50}>Workshops</Link>
              <Link className="nav-link" to="sharepics" spy={true} smooth={true} offset={50} duration={50}>Bewerben</Link>
              <Link className="nav-link" to="news" spy={true} smooth={true} offset={50} duration={50}>News</Link>
              <Link className="nav-link" to="newsletter" spy={true} smooth={true} offset={50} duration={50}>Newsletter</Link>
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
      let activeClass = '';
      if(window.scrollY > mainNavOffset){
          activeClass = 'main-nav-top';
      }
      this.setState({ activeClass });
    });
  }
}
