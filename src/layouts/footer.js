import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import './../assets/styles/footer.scss';

export default class Footer extends Component {
    render() {
        const links = this.props.pages
            .map(page => {
                if (page.menuLinks === undefined || page.menuLinks.length === 0) {
                    return false;
                }

                let data;

                page.menuLinks.forEach(link => {
                    if (data) {
                        return;
                    }

                    if (link.menu === 'footer') {
                        data = {
                            id: page.id,
                            path: page.path,
                            title: link.title,
                            weight: link.weight,
                        }
                    }
                });

                if (!data) {
                    return false;
                }

                return data;
            })
            .filter(item => item)
            .sort((a, b) => {
                return a.weight - b.weight
            });

        const currentYear = new Date().getFullYear()

        return (
            <div className="footer container">
                <footer>
                    <div class="footer-border">
                        <div class="xsmall"></div>
                        <div class="small"></div>
                        <div class="large"></div>
                        <div class="small"></div>
                        <div class="xsmall"></div>
                    </div>
                    <div class="danai">
                        <div className="text-light">&reg;Kolpingjugend - Kolpingwerk Bayern {currentYear}</div>
                        <div className="navigation">
                            <nav className="navbar navbar-expand">
                                <ul className="navbar-nav ml-auto">
                                    {links.map(link => {
                                        return ( <li className="nav-item">
                                            <NavLink className="nav-link" to={link.path} key={'menu-link-' + link.id}>
                                                {link.title}
                                            </NavLink>
                                        </li>)
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
