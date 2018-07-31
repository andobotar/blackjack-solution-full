export default hand => {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
        if (card[1] === '1' && card.length === 2) {
            score += 1;
            aces++;
        } else if (card[1] === '1') {
            score += 10;
        } else {
            score += +card[1];
        }
    });
    for (let i = 0; i < aces; i++) {
        if (score <= 11) {
            score += 10;
        }
    }

    return score;
};
