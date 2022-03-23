import React from 'react'
import Button from 'react-bootstrap/Button'

const FaqQuestion = () => {
    return (
        <div className="faq-question text-center">
            <h6>Noch fragen? Dann stelle sie uns hier:</h6>
            <Button variant="primary">Frage stellen</Button>{' '}
        </div>
    )
};

export default FaqQuestion