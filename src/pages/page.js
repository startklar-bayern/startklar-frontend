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
                    <Row className="my-4">
                        <Col>
                            <h1>{this.props.page.title}</h1>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col className="field-object p-4 fs-6">
                            <div dangerouslySetInnerHTML={{__html: this.props.page.body}}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
