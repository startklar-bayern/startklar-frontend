import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMapPin } from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga4';
import '../assets/styles/calendar.scss';
import Countdown from "./countdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Dropdown} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {faApple, faGoogle, faMicrosoft} from "@fortawesome/free-brands-svg-icons";
import icsFile from '../assets/startklar.ics';

export default class Calendar extends Component {

    constructor(props, context) {
        super(props, context);

        this.trackGaEvent = this.trackGaEvent.bind(this);
    }

    render() {
        return (
            <div className="calendar text-center mb-4">
                <Countdown />

                <div className="mb-4 event-info">
                    <span className="mx-3"><FontAwesomeIcon icon={faCalendar}/> 08. - 11. Juni 2023</span>
                    <span className="mx-3"><FontAwesomeIcon icon={faMapPin}/> Zeltplatz Thalmässing</span>
                </div>

                <Dropdown>
                    <DropdownToggle variant="outline-dark" className="mb-2" title="Zum Kalender hinzufügen">
                        Zum Kalender hinzufügen <FontAwesomeIcon icon={faPlus}/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => {this.trackGaEvent('Google Calendar')}} target="_blank" href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230607%2F20230611&details=Mehr%20infos%20auf%20https%3A%2F%2Fwww.startklar.bayern&location=Reinwarzhofen%2017%2C%20Thalm%C3%A4ssing%2C%2091177%2C%20Germany&text=STARTKLAR%20-%20Jugendfestival%20der%20Kolpingjugend%20Bayern">
                            <FontAwesomeIcon icon={faGoogle}/> Google Kalender
                        </DropdownItem>
                        <DropdownItem onClick={() => {this.trackGaEvent('Apple Calendar')}} target="_blank" href={icsFile}>
                            <FontAwesomeIcon icon={faApple}/> Apple Kalender
                        </DropdownItem>
                        <DropdownItem onClick={() => {this.trackGaEvent('Office 365')}} target="_blank" href="https://outlook.office.com/calendar/0/deeplink/compose?allday=true&body=Mehr%20infos%20auf%20https%3A%2F%2Fwww.startklar.bayern&enddt=2023-06-11T22%3A00%3A00%2B00%3A00&location=Reinwarzhofen%2017%2C%20Thalm%C3%A4ssing%2C%2091177%2C%20Germany&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-06-07T22%3A00%3A00%2B00%3A00&subject=STARTKLAR%20-%20Jugendfestival%20der%20Kolpingjugend%20Bayern">
                            <FontAwesomeIcon icon={faMicrosoft}/> Office 365
                        </DropdownItem>
                        <DropdownItem onClick={() => {this.trackGaEvent('Outlook.com')}} target="_blank" href="https://outlook.live.com/calendar/0/deeplink/compose?allday=true&body=Mehr%20infos%20auf%20https%3A%2F%2Fwww.startklar.bayern&enddt=2023-06-11T22%3A00%3A00%2B00%3A00&location=Reinwarzhofen%2017%2C%20Thalm%C3%A4ssing%2C%2091177%2C%20Germany&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-06-07T22%3A00%3A00%2B00%3A00&subject=STARTKLAR%20-%20Jugendfestival%20der%20Kolpingjugend%20Bayern">
                            <FontAwesomeIcon icon={faMicrosoft}/> Outlook.com
                        </DropdownItem>
                        <DropdownItem onClick={() => {this.trackGaEvent('ics')}} target="_blank" href={icsFile}>
                            <FontAwesomeIcon icon={faCalendar}/> Sonstige <small>(.ics)</small>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    trackGaEvent(service) {
        ReactGA.event({
            category: "calendar",
            action: "addToCalendar",
            label: service
        })
    }
}
