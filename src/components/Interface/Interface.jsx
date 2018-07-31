import React from 'react';
import PropTypes from 'prop-types';

import Outcome from '../Outcome/Outcome';

Interface.propTypes = {
    message: PropTypes.string.isRequired,
    computerScore: PropTypes.number.isRequired,
    playerScore: PropTypes.number.isRequired,
    deal: PropTypes.func.isRequired,
    hit: PropTypes.func.isRequired,
    stand: PropTypes.func.isRequired
};

function Interface({ message, computerScore, playerScore, deal, hit, stand }) {
    return (
        <div>
            <Outcome message={message} />
            <div>
                <p className="score">Dealer Score : {computerScore}</p>
                <p className="score">Player Score : {playerScore}</p>
            </div>
            <button id="deal-button" onClick={deal}>
                Deal
            </button>
            <button id="hit-button" onClick={hit}>
                Hit
            </button>
            <button id="stand-button" onClick={stand}>
                Stand
            </button>
        </div>
    );
}
export default Interface;
