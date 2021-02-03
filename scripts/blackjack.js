// card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}