import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark">
            <div className="container">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/impressum">
                    Impressum
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer