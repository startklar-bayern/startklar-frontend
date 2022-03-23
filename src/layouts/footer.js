import React, {Component} from "react";
import {NavLink} from "react-router-dom";

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

        return (
            <div className="footer">
                <footer>
                    <div className="navigation">
                        <nav className="navbar navbar-expand navbar-dark">
                            <div className="container">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        {links.map(link => {
                                            return (<NavLink className="nav-link" to={link.path} key={'menu-link-' + link.id}>
                                                {link.title}
                                            </NavLink>)
                                        })}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </footer>
            </div>
        );
    }
}

