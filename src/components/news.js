import React, {Component} from 'react'
import {Col, Modal, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faXmark} from '@fortawesome/free-solid-svg-icons'
import {format} from 'date-fns'
import './../assets/styles/news.scss';

export default class News extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
          show: null
        };
    }

    handleClose() {
        this.setState({
            show: null
        });
    }

    handleShow(id) {
        this.setState({show: id});
    }

    render() {
        const news = this.props.news;

        return (
            <div>
                <center><h2 className="mb-4">Was gibt's neues?</h2></center>
                <Row>
                    {news.map((singleNews) => (
                        <>
                            <Col md={6} lg={4} id={singleNews.id} key={singleNews.id} className="singleNews my-4">
                                <div className="position-relative mb-4">
                                    <img className="newsPic" src={singleNews.previewImage.previewUrl} alt={singleNews.previewImage.altText} width={singleNews.previewImage.width} height={singleNews.previewImage.height} loading="lazy"/>
                                    <div className="createdBadge text-light">{format(new Date(singleNews.created), "dd.MM.yyyy")}</div>
                                </div>
                                <h6>{singleNews.title}</h6>
                                <p className="text-light">{singleNews.teaser}</p>
                                <button className="btn btn-link" onClick={() => this.handleShow(singleNews.id)}><strong>Zum Beitrag <FontAwesomeIcon icon={faArrowRight}/></strong></button>
                                <Modal show={this.state.show === singleNews.id} onHide={this.handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>{singleNews.title}</Modal.Title>
                                        <button className="btn btn-link modal-close" onClick={this.handleClose}><FontAwesomeIcon icon={faXmark}/></button>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="position-relative mb-4">
                                            <img className="newsPic" src={singleNews.previewImage.previewUrl} alt={singleNews.previewImage.altText} width={singleNews.previewImage.width} height={singleNews.previewImage.height} loading="lazy"/>
                                            <div className="createdBadge text-light">{format(new Date(singleNews.created), "dd.MM.yyyy")}</div>
                                        </div>
                                        <p dangerouslySetInnerHTML={{__html: singleNews.body}} />
                                        <Row className="additionalImages g-4">
                                            {singleNews.images && singleNews.images.map((additionalImage) => (
                                                <Col xs={12} lg={6}>
                                                    <img className="additionalImage" src={additionalImage.previewUrl} alt={additionalImage.altText} width={additionalImage.width} height={additionalImage.height} loading="lazy"/>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Modal.Body>
                                </Modal>
                            </Col>

                        </>
                    ))}
                </Row>
            </div>
        );
    }
}

