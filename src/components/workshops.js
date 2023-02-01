import React, { Component } from 'react';
import Isotope from 'isotope-layout';
import {Col, Modal, Row} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faXmark} from '@fortawesome/free-solid-svg-icons'
import {format} from 'date-fns'
import './../assets/styles/workshops.scss';

class Workshops extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    this.state = {
      show: null,
      active: "*"
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

  onFilterChange = (newFilter) => {
    if (this.iso === undefined) {
      this.iso = new Isotope('#filter-container', {
        itemSelector: '.filter-item',
        layoutMode: "fitRows"
      });
    }

    if(newFilter === '*') {
      this.iso.arrange({ filter: `*` });
    } else {
      this.iso.arrange({ filter: `.${newFilter}` });
    }

    this.setState({active: newFilter});
  }

  render() {
    const workshops = this.props.workshops;

    return(
      <>
        <Row className="row">
          <Col className="col">
            <center>
              <h2 className="mb-4">Workshops</h2>
            </center>
          </Col>
        </Row>

        <ul id="workshop-flters" className="workshop-filter text-light">
          <li data-filter="*" className={this.state.active === "*" ? "text-white" : ""} onClick={() => {this.onFilterChange("*")}}>Alle Workshops</li>
          <li data-filter="friday_morning" className={this.state.active === "friday_morning" ? "text-white" : ""} onClick={() => {this.onFilterChange("friday_morning")}}>Freitag vormittag</li>
          <li data-filter="friday_afternoon" className={this.state.active === "friday_afternoon" ? "text-white" : ""} onClick={() => {this.onFilterChange("friday_afternoon")}}>Freitag nachmittag</li>
          <li data-filter="saturday_morning" className={this.state.active === "saturday_morning" ? "text-white" : ""} onClick={() => {this.onFilterChange("saturday_morning")}}>Samstag vormittag</li>
          <li data-filter="saturday_afternoon" className={this.state.active === "saturday_afternoon" ? "text-white" : ""} onClick={() => {this.onFilterChange("saturday_afternoon")}}>Samstag nachmittag</li>
        </ul>

        <Row className="mb-4" id="filter-container">
          {workshops.map((workshop) => (
            <Col xs={6} lg={4} key={'workshop-' + workshop.id} className={workshop.timeslots.join(" ") + " my-4 filter-item"}>
                <img className="workshop" src={workshop.previewImage.previewUrl} alt={workshop.previewImage.altText} width={workshop.previewImage.width} height={workshop.previewImage.height} loading="lazy"/>
                <h6>{workshop.title}</h6>
                {workshop.summary &&
                  <p class="text-light">{workshop.summary}</p>
                }
                <button className="btn btn-link" onClick={() => this.handleShow(workshop.id)}><strong>Weitere Infos <FontAwesomeIcon icon={faArrowRight}/></strong></button>
                <Modal show={this.state.show === workshop.id} onHide={this.handleClose}>
                      <Modal.Header>
                          <Modal.Title>{workshop.title}</Modal.Title>
                          <button className="btn btn-link modal-close" onClick={this.handleClose}><FontAwesomeIcon icon={faXmark}/></button>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="position-relative mb-4">
                              <img className="newsPic" src={workshop.previewImage.previewUrl} alt={workshop.previewImage.altText} width={workshop.previewImage.width} height={workshop.previewImage.height} loading="lazy"/>
                          </div>
                          <p dangerouslySetInnerHTML={{__html: workshop.body}} />

                          {workshop.location &&
                            <p class="text-light">Location: {workshop.location}</p>
                          }

                          <Row className="additionalImages g-4">
                              {workshop.images && workshop.images.map((additionalImage) => (
                                  <Col xs={12} lg={6}>
                                      <img className="additionalImage" src={additionalImage.previewUrl} alt={additionalImage.altText} width={additionalImage.width} height={additionalImage.height} loading="lazy"/>
                                  </Col>
                              ))}
                          </Row>
                      </Modal.Body>
                  </Modal>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default Workshops