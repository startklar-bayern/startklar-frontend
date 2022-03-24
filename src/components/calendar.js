import React from 'react'
import Button from 'react-bootstrap/Button'

const Calendar = () => {
    return (
        <div className="calendar text-center mb-4">
            <h2>Noch <span className="h1">365</span> Tage und <span className="h1">16</span> Stunden</h2>
            <Button variant="outline-dark">Zum Kalender hinzufügen</Button>{' '}
        </div>
    )
};

export default Calendar