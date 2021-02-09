import React from 'react'

const Featured = () => {
    return (
        <section className="features-section">
            <div className="columns-wrapper">
                <div className="column">
                    <i className="fas fa-heartbeat"></i>
                    <p>We Care!</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="column">
                    <i className="fas fa-wifi"></i>

                    <p>Get Your Health data </p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="column">
                    <i className="fas fa-user-md"></i>
                    <p>OnLine - Doctors</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>

        </section>
    )
}

export default Featured
