import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMapPin } from '@fortawesome/free-solid-svg-icons'

const Calendar = () => {
    return (
        <div className="calendar text-center mb-4">
            <h2>Noch <span className="h1">365</span> Tage und <span className="h1">16</span> Stunden</h2>
            <div className="mb-4"><span className="mx-4"><FontAwesomeIcon icon={faCalendar} /> 08.-11.06.23</span><span><FontAwesomeIcon icon={faMapPin} /> 92318 Neumarkt, Föhrenweg 32</span></div>
            <Button variant="outline-dark">Zum Kalender hinzufügen <FontAwesomeIcon icon={faPlus} /></Button>{' '}
        </div>
    )
};

export default Calendar