import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavLinks from '../components/nav-links';
import './../assets/styles/navbar.scss';

export default class StartklarNavbar extends Component {
  state = {
    activeClass: 'main-nav-bottom'
  }

  constructor(props, context) {
      super(props, context);
  }

  render() {
    return (
      <Navbar id="main-nav" className={`main-nav ${this.state.activeClass}`} variant="dark" bg="black" >
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLinks />
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
