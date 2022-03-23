import React from "react";
import { ReactComponent as Logo } from './../assets/images/logo.svg';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <div className="header">
      <Navbar variant="light" fixed="top">
        <NavLink className="navbar-brand" to="/">
          <Logo />
        </NavLink>
      </Navbar>
    </div>
  );
}

export default Header