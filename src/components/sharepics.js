import React from 'react'
import './../assets/styles/sharepics.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h1>Spread the world</h1></center>
            <Row>
                {sharepics.map((sharepic) => (
                    <Col xs={6} lg={3} key={'sharepic-' + sharepic.id}>
                        <p>{sharepic.body}</p>
                        <img src={sharepic.imagePreviewUrl} alt={sharepic.altText} />
                    </Col>
                ))}
            </Row>
        </div>

    )
};

export default Sharepics