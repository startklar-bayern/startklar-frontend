import React, {Component} from "react";
import {Col, Container, Row} from 'react-bootstrap'
import {Helmet} from "react-helmet-async";
import {HeaderWhite} from "../layouts";

export default class Page extends Component {

    render() {
        return (
            <div className="about">
                <Helmet>
                    <title>{this.props.page.title} | STARTKLAR</title>
                </Helmet>
                <HeaderWhite />
                <Container>
                    <Row className="align-items-center my-5">
                        <Col>
                            <h1 className="font-weight-light">{this.props.page.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: this.props.page.body}}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
