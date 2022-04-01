import React, {Component} from "react";
import {Container, Row, Col}  from 'react-bootstrap'

export default class Page extends Component {

    render() {
        return (
            <div className="about">
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
