import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.scss";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {
    Header,
    Footer,
} from "./layouts";

import {Home} from "./pages";
import Page from "./pages/page";

fetch('https://backend.startklar.bayern/api/pages')
    .then(response => response.json())
    .then(pages => {
        ReactDOM.render(
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {pages.map(page => {
                        return (<Route key={'page-' + page.id} path={page.path} element={<Page page={page}/>}/>)
                    })}

                </Routes>
                <Footer pages={pages}/>
            </Router>,
            document.getElementById("root")
        );
    })

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();