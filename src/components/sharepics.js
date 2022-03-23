import React from 'react'
import './../assets/styles/sharepics.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h1>Spread the world</h1></center>
            <Row>
                {sharepics.map((sharepics) => (
                    <Col xs={6} lg={3}>
                        <p>{sharepics.body}</p>
                        <img src={sharepics.imagePreviewUrl} alt={sharepics.altText} />
                    </Col>
                ))}
            </Row>
        </div>

    )
};

export default Sharepics