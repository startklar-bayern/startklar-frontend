import React from 'react'

const Faq = ({faqs}) => {
    return (
        <div>
            <center><h1>FAQ</h1></center>
            {faqs.map((faqs) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{faqs.question}</h5>
                        <p class="card-text">{faqs.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Faq