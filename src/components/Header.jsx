import React from "react";
import { ReactComponent as Logo } from './../assets/images/logo.svg';
import './../assets/styles/header.scss';

function Header() {
  return (
    <div className="header">
      <header class="py-5">
        <div class="container">
            <Logo />
        </div>
      </header>
    </div>
  );
}

export default Header;