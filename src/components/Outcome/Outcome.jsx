import React from 'react';
import PropTypes from 'prop-types';

Outcome.propTypes = {
    message: PropTypes.string.isRequired
};

function Outcome({ message }) {
    return <div className="outcome">{message}</div>;
}
export default Outcome;
