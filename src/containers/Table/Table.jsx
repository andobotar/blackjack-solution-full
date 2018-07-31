import React, { Component, Fragment } from 'react';
import shuffle from 'lodash/shuffle';

import Hand from '../../components/Hand/Hand';
import Interface from '../../components/Interface/Interface';
import fullDeck from '../../utils/fullDeck';
import countScore from '../../utils/countScore';
import {
    DEAL_MESSAGE,
    PLAYING,
    GAME_OVER,
    PLAYER_WINS,
    COMPUTER_WINS,
    HIT_OR_STAND,
    OVERDRAWN,
    FOLDED_CARD,
    DEALER_HIT_LIMIT,
    BLACK_JACK_SCORE
} from '../../utils/constants';

class Table extends Component {
    state = {
        deck: [...fullDeck],
        computerHand: [FOLDED_CARD, FOLDED_CARD],
        playerHand: [FOLDED_CARD, FOLDED_CARD],
        message: DEAL_MESSAGE,
        status: PLAYING
    };

    componentDidMount() {
        this.deal();
    }

    deal = () => {
        const cards = shuffle([...fullDeck]);
        const computersDealtHand = [FOLDED_CARD];
        const playersDealtHand = [];

        // player's hands, deal 2 cards
        playersDealtHand.push(cards.pop());
        playersDealtHand.push(cards.pop());

        // computer's hands

        // let's just burn a Card
        cards.pop();

        // since we are using client side state the dealer secret Card is only popped out of the deal at the time the user clicks Stand
        computersDealtHand.push(cards.pop());

        this.setState({
            computerHand: computersDealtHand,
            playerHand: playersDealtHand,
            deck: cards,
            status: PLAYING,
            message: HIT_OR_STAND
        });
    };

    hit = () => {
        if (this.state.status === GAME_OVER) return;

        const playersDealtHand = [...this.state.playerHand];

        const shuffled = shuffle([...this.state.deck]);
        playersDealtHand.push(shuffled.pop());

        const score = countScore(playersDealtHand);
        if (score > 21) {
            this.setState({
                message: OVERDRAWN,
                status: GAME_OVER
            });
        }

        this.setState({
            playerHand: playersDealtHand,
            deck: shuffled
        });
    };

    stand = () => {
        if (this.state.status === GAME_OVER) return;

        const computersFullHand = [...this.state.computerHand];
        // remove hidden Card
        computersFullHand.shift();
        // we shuffle every time so you don't cheat by checking component state :D
        const shuffled = shuffle([...this.state.deck]);
        // add a real Card instead of the face-down first Card
        computersFullHand.unshift(shuffled.pop());

        let computerScore = countScore(computersFullHand);
        let playerScore = countScore(this.state.playerHand);

        // compute game status while dealing cards to the dealer
        while (computerScore < playerScore || computerScore < DEALER_HIT_LIMIT) {
            // deal a Card
            computersFullHand.push(shuffled.pop());
            computerScore = countScore(computersFullHand);
        }

        this.setState({
            computerHand: computersFullHand,
            deck: shuffled,
            status: GAME_OVER,
            message: computerScore > BLACK_JACK_SCORE ? PLAYER_WINS : COMPUTER_WINS
        });
    };

    render() {
        return (
            <Fragment>
                <Hand cards={this.state.computerHand} />
                <Interface
                    message={this.state.message}
                    deal={this.deal}
                    hit={this.hit}
                    stand={this.stand}
                    computerScore={countScore(this.state.computerHand)}
                    playerScore={countScore(this.state.playerHand)}
                />
                <Hand cards={this.state.playerHand} />
            </Fragment>
        );
    }
}
export default Table;
