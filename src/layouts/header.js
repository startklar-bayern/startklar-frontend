import React from "react";
import logo from './../assets/images/logo.png';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <div className="header">
      <Navbar variant="light" fixed="top">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </Navbar>
    </div>
  );
}

export default Header