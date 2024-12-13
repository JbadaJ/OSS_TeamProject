import React from 'react';

function Slider() {
    return (
        <section className="bg-white py-3 border-top">
            <div className="container d-flex justify-content-center align-items-center gap-4">
                <button className="btn btn-outline-dark">←</button>
                <div className="fw-bold">
                    <span>01</span> / <span>05</span>
                </div>
                <button className="btn btn-outline-dark">→</button>
                <button className="btn btn-dark ms-3">⏸ Pause</button>
            </div>
        </section>
    );
}

export default Slider;
