import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Isotope from 'isotope-layout';

// Container for isotope grid
class Workshops extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isotope: null };
    }

    render() {
        return(
          <div className="item-grid">
              {this.props.workshops}
          </div>
        )
    }

    // set up isotope
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        if (!this.state.isotope) {
            this.setState({
                isotope: new Isotope( node )
            });
        } else {
            this.state.isotope.reloadItems();
        }
    }

    // update isotope layout
    componentDidUpdate() {
        if (this.state.isotope) {
            this.state.isotope.reloadItems();
            this.state.isotope.layout();
        }
    }
}

export default Workshops;

/* import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'

export default class Workshops extends Component {
    render() {
        const workshops = this.props.workshops;

        return (
            <div>
                <center><h2 className="mb-4">Workshops</h2></center>
                <Row className="mb-4">
                    {workshops.map((workshop) => (
                        <Col xs={6} lg={3} key={'workshop-' + workshop.id} className="my-4">
                            <h6>{workshop.title}</h6>
                            <img className="workshop" src={workshop.previewImage.previewUrl} alt={workshop.previewImage.altText} width="200" height="200" loading="lazy"/>
                            {workshop.summary &&
                              <p class="text-light">{workshop.summary}</p>
                            }
                            {workshop.timeslots &&
                              <ul>
                                {workshop.timeslots.map((timeslot) => (
                                    <li>{timeslot}</li>
                                ))}
                              </ul>
                            }
                            {workshop.location &&
                              <p>Location: {workshop.location}</p>
                            }
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
} */

/*
[
  {
    "id": 0,
    "title": "Handmassage",
    "summary": "Lorem Ipsum dolor sit amet.\r\nEt consetutor.",
    "body": "Lorem Ipsum dolor sit amet. <br>Et consetutor.",
    "timeslots": [
      "friday_morning"
    ],
    "location": "Hauptbühne",
    "previewImage": {
      "url": "https://backend.startklar.bayern/sites/default/files/images/123.jpg",
      "previewUrl": "https://backend.startklar.bayern/sites/default/files/styles/preview/public/images/123.jpg",
      "altText": "Lachende Personen am Lagerfeuer",
      "width": 0,
      "height": 0
    },
    "images": [
      {
        "url": "https://backend.startklar.bayern/sites/default/files/images/123.jpg",
        "previewUrl": "https://backend.startklar.bayern/sites/default/files/styles/preview/public/images/123.jpg",
        "altText": "Lachende Personen am Lagerfeuer",
        "width": 0,
        "height": 0
      }
    ]
  }
]
*/