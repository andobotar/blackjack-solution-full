import React from 'react';
import PropTypes from 'prop-types';

Card.propTypes = {
    face: PropTypes.string.isRequired
};

function Card({ face }) {
    return (
        <div className="card">
            <img src={`images/${face}.png`} alt="card" />
        </div>
    );
}
export default Card;
