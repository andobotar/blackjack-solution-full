import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';

Hand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
};

function Hand({ cards }) {
    return cards.map((card, index) => <Card key={card + index} face={card} />);
}
export default Hand;
