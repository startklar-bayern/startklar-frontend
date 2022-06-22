import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {format} from 'date-fns'
import {Modal} from "react-bootstrap";
import './../assets/styles/news.scss';

export default class News extends Component {
    state = {
        loading: false,
        showCopyNote: false,
    }

    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    render() {
        const news = this.props.news;

        return (
            <div>
                <center><h2 className="mb-4">Was gibt's neues?</h2></center>
                <Row>
                    {news.map((singleNews) => (
                        <>
                            <Col xs={6} lg={4} key={'news-' + singleNews.id} className="singleNews">
                                <div className="position-relative mb-4">
                                    <img className="newsPic" src={singleNews.previewImage.previewUrl} alt={singleNews.previewImage.altText} width="200" height="200" loading="lazy"/>
                                    <div className="createdBadge text-light">{format(new Date(singleNews.created), "dd.MM.yyyy")}</div>
                                </div>
                                <h6>{singleNews.title}</h6>
                                <p className="text-light">{singleNews.teaser}</p>
                                <button className="btn btn-link" onClick={this.handleOnClick}><strong>Zum Beitrag <FontAwesomeIcon icon={faArrowRight}/></strong></button>
                            </Col>
                            <Modal show={this.state.modalOpen} onHide={this.handleModalClose}>
                                <Modal.Header>
                                    <Modal.Title>{singleNews.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="position-relative mb-4">
                                        <img className="newsPic" src={singleNews.previewImage.previewUrl} alt={singleNews.previewImage.altText} width="200" height="200" loading="lazy"/>
                                        <div className="createdBadge text-light">{format(new Date(singleNews.created), "dd.MM.yyyy")}</div>
                                    </div>
                                    <p dangerouslySetInnerHTML={{__html: singleNews.body}} />
                                </Modal.Body>
                            </Modal>
                        </>
                    ))}
                </Row>
            </div>
        );
    }

    handleOnClick(e) {
        this.handleModalOpen();

        this.setState({
            loading: true,
        });
    }

    handleModalOpen() {
        this.setState({
            modalOpen: true,
        });
    }

    handleModalClose() {
        this.setState({
            modalOpen: false
        });
    }
}

