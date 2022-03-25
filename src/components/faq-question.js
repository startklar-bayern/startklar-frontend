import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const FaqQuestion = () => {
    return (
        <div className="faq-question text-center">
            <h6>Noch fragen? Dann stelle sie uns hier:</h6>
            <Button variant="primary">Frage stellen <FontAwesomeIcon icon={faArrowRight} /></Button>{' '}
        </div>
    )
};

export default FaqQuestion