// Card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

// DOM Variables
let textArea = document.getElementById("text-area");
let gameZones = document.getElementById("game-zones");

let dealerWinStatus = document.getElementById("dealer-win-status");
let dealerCardsDisplay = document.getElementById("dealer-cards");
let dealerScoreDisplay = document.getElementById("dealer-score");

let playerWinStatus = document.getElementById("player-win-status");
let playerCardsDisplay = document.getElementById("player-cards");
let playerScoreDisplay = document.getElementById("player-score");

let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display="none";
stayButton.style.display="none";
gameZones.style.display="none";

showStatus();

newGameButton.addEventListener("click", function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];

    dealerWinStatus.innerText = "";
    playerWinStatus.innerText = "";

    newGameButton.style.display="none";
    hitButton.style.display="inline";
    stayButton.style.display="inline";
    gameZones.style.display="flex";
    showStatus();
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function createDeck() {
    let deck = [];
    for (let suitIdx=0; suitIdx < suits.length; suitIdx++ ) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++){
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card)
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumericValue(card) {
    switch(card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
    updateScores();

    if(gameOver) {
        while(dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
                dealerCards.push(getNextCard());
                updateScores();
        }
    }

    if (dealerCards.count >= 5) {
        playerWon = false;
        gameOver = True;
    }

    if (playerScore === 21) {
        playerWon = true;
        gameOver = true;
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function showStatus() {
    if (!gameStarted) {
        return;
    }

    if (gameStarted) {
        textArea.innerText = "Good Luck!";
    }

    let dealerCardString = '';
    for (let i=0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = '';
    for (let i=0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    dealerCardsDisplay.innerText = dealerCardString;
    dealerScoreDisplay.innerText = dealerScore;

    playerCardsDisplay.innerText = playerCardString;
    playerScoreDisplay.innerText = playerScore;

    if (gameOver) {
        if (playerWon) {
            playerWinStatus.innerText = "You Win!";
            dealerWinStatus.innerText = "Dealer Loses!";
        }
        else {
            dealerWinStatus.innerText = "Dealer Wins";
            playerWinStatus.innerText = "You Lose!";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
        textArea.innerText = 'Game ended, to start a new game press "New Game" below.';
    }
}