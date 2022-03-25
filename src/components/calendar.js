import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMapPin } from '@fortawesome/free-solid-svg-icons'
import '../assets/styles/calendar.scss';

export default class Calendar extends Component {

    componentDidMount() {
        window.addeventasync = function () {
            window.addeventatc.settings({
                appleical  : {show:true, text:"Apple Calendar"},
                google     : {show:true, text:"Google <em>(online)</em>"},
                office365  : {show:true, text:"Office 365 <em>(online)</em>"},
                outlookcom : {show:true, text:"Outlook.com <em>(online)</em>"},
                outlook    : {show:true, text:"Sonstige <em>(.ics)</em>"},
                yahoo      : {show:false, text:"Yahoo <em>(online)</em>"},
                css: true,
            });

            window.addeventatc.register('button-dropdown-click', obj => {
                // TODO: Track clicks
                /* Log */
                console.log('button-dropdown-click -> ' + obj.id + ', service -> ' + obj.service);
                console.log(obj);

                /* Track event click with e.g. Google Analytics (using analytics.js)
                https://developers.google.com/analytics/devguides/collection/analyticsjs/events */
                window.ga('send', 'event', 'MyEvent', 'play', 'Fall Campaign');
            })
        }

        const script = document.createElement("script");
        script.src = "https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js";
        script.async = true;
        script.defer = true
        script.type = "text/javascript";

        document.body.appendChild(script);
    }

    render() {
        return (
            <div className="calendar text-center mb-4">
                <h2>Noch <span className="h1">365</span> Tage und <span className="h1">16</span> Stunden</h2>

                <Button variant="outline-dark" className="mb-2 addeventatc" title="Zum Kalender hinzufügen">
                    Zum Kalender hinzufügen <FontAwesomeIcon icon={faPlus}/>
                    <span className="start">06-08-2023</span>
                    <span className="end">06-11-2023</span>
                    <span className="timezone">Europe/Berlin</span>
                    <span className="title">STARTKLAR - Jugendfestival der Kolpingjugend Bayern</span>
                    <span className="description">Komm mit auf das Jugendfestival der Kolpingjugend Bayern. Alle Infos auf https://www.startklar.bayern</span>
                    <span className="location">Reinwarzhofen 17, Thalmässing, 91177, Germany</span>
                    <span className="organizer">Kolpingjugend Bayern</span>
                    <span className="organizer_email">info@startklar.bayern</span>
                    <span className="all_day_event">true</span>
                    <span className="date_format">MM/DD/YYYY</span>
                    <span className="alarm_reminder">1440</span>
                    <span className="client">aEpukSZYxzpxeFJZQmvY155248</span>
                </Button>

                <div><span className="mx-4"><FontAwesomeIcon
                    icon={faCalendar}/> 08. - 11. Juni 2023</span><span><FontAwesomeIcon icon={faMapPin}/> Zeltplatz Thalmässing im DV Eichstätt</span>
                </div>
            </div>
        );
    }
}
