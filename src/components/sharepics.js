import React from 'react'

const Sharepics = ({sharepics}) => {
    return (
        <div>
            <center><h1>Sharepics</h1></center>
            {sharepics.map((sharepics) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Sharepic 1</h5>
                        <p class="card-text">{sharepics.body}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Sharepics