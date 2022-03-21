import React from "react";
import { ReactComponent as Logo } from './../assets/images/logo.svg';
import './../assets/styles/header.scss';
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <nav class="navbar navbar-light">
        <NavLink className="navbar-brand" to="/">
          <Logo />
        </NavLink>
      </nav>
    </div>
  );
}

export default Header