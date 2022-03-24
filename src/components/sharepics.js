import React from 'react'
import './../assets/styles/sharepics.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h2>Spread the word</h2></center>
            <Row>
                {sharepics.map((sharepic) => (
                    <Col xs={6} lg={3} key={'sharepic-' + sharepic.id}>
                        <div dangerouslySetInnerHTML={{__html: sharepic.body}}/>
                        <img src={sharepic.imagePreviewUrl} alt={sharepic.altText} />
                    </Col>
                ))}
            </Row>
        </div>

    )
};

export default Sharepics