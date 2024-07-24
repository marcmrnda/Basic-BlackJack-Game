let player = {
    name: prompt("Whats your name?",""),
    chips: 100
};

let playerCards = [];
let dealerCards = [];
let wantToHit = [0, 1]
let playerSum;
let dealerSum;
let playerFirstCard;
let playerLastCard;
let dealerFirstCard;
let dealerLastCard;
let isAlivePlayer = false;
let isBlackJackPlayer = false;
let isAliveDealer = false;
let isBlackJackDealer = false;
let playerHand = document.getElementById('player-Card');
let playerTotal = document.getElementById('player-Total');
let dealerHand = document.getElementById('dealer-Card');
let dealerTotal = document.getElementById('dealer-Total');
let messageEl = document.getElementById('message');
let message;
let playerOne = document.getElementById('player-1');

function getRandomNumber() {
    let random = Math.floor(Math.random() * 13) + 1;

    if (random >= 11) {
        return 10;
    }
    else if (random === 1) {
        let ace = [1, 11];
        return ace[Math.floor(Math.random() * ace.length)];
    }
    else {
        return random;
    }
}
function startNewGame() {
    playerOne.textContent = player.name + ": $" + player.chips;
    player.chips = 100;
}

function startGame() {
    
    playerFirstCard = getRandomNumber();
    playerLastCard = getRandomNumber();
    dealerFirstCard = getRandomNumber();
    dealerLastCard = getRandomNumber();
    playerCards = [playerFirstCard, playerLastCard];
    dealerCards = [dealerFirstCard, dealerLastCard];
    playerSum = playerFirstCard + playerLastCard;
    dealerSum = dealerFirstCard + dealerLastCard;
    isAlivePlayer = true;
    isAliveDealer = true;
    isBlackJackPlayer = false;
    isBlackJackDealer = false;
    messageEl.textContent = "";
    playerOne.textContent = player.name + ": $" + player.chips;
    player.chips -= 30;
    renderGame();
}

function renderGame() {
    messageEl.textContent = "";
    playerHand.textContent = "Player Cards: ";
    dealerHand.textContent = "Dealer Cards: ";
    playerTotal.textContent = "Player Total: ";
    dealerTotal.textContent = "Dealer Total: ";

    for (let i = 0; i < playerCards.length; i++) {

        playerHand.textContent +=  " " + playerCards[i] + " ";
    }

    for (let i = 0; i < dealerCards.length; i++) {
        dealerHand.textContent += " " + dealerCards[i] + " ";
    } 
    
    playerTotal.textContent += " " + playerSum;
    dealerTotal.textContent +=  " " + dealerSum;

    if(dealerSum === playerSum) {
        message = "It's a Tie!";
        messageEl.textContent = message;
        isAlivePlayer = false;
        isAliveDealer = false;
        player.chips += 30;
    }
    else if(playerSum > 21) {
        message = "Player Busted! Dealer Wins!";
        messageEl.textContent = message;
        isBlackJackPlayer = true;
        isAlivePlayer = false;
    }
    else if(playerSum === 21) {
        message = "Player Blackjack! Player Wins!";
        messageEl.textContent = message;
        isBlackJackPlayer = true;
        isAliveDealer = false;
        player.chips += 50;

    }
    else if(dealerSum > 21) {
        message = "Dealer Busted! Player Wins!";
        messageEl.textContent = message;
        isBlackJackDealer = true;
        isAliveDealer = false;
        player.chips += 50;
        
    }
    else if(dealerSum === 21) {
        message = "Dealer Blackjack! Dealer Wins!";
        messageEl.textContent = message;
        isBlackJackDealer = true;
        isAlivePlayer = false;
        
    }

    if(player.chips <= 0) { 
        message = "Game Over! You're out of chips. Please start a new game.";
        messageEl.textContent = message;
        isAlivePlayer = false;
        isAliveDealer = false;
    }
    
}

function hitMe() {
    hitMePlayer();
    hitMeDealer();
}


function hitMePlayer() {
    if(isBlackJackPlayer === false && isAlivePlayer === true) {
        let newCard = getRandomNumber();
        playerCards.push(newCard);
        playerSum += newCard;
        renderGame();
    }
}


function hitMeDealer() {
    let dealerDecision = wantToHit[Math.floor(Math.random() * 2)];
    if(isBlackJackDealer === false && isAliveDealer === true && dealerDecision === 0) {
        let newCard = getRandomNumber();
        dealerCards.push(newCard);
        dealerSum += newCard;
        renderGame();
    }
}

function stand() {
    isAlivePlayer = false;
    isAliveDealer = false;
    let dealerDecision = wantToHit[Math.floor(Math.random() * 2)];
    message = "Player Stands!";
    messageEl.textContent = message;
    
    if(dealerSum > playerSum) {
        message = "Dealer Wins!";
        messageEl.textContent = message;
    }
    else if(playerSum > dealerSum) {
        message = "Player Wins!";
        messageEl.textContent = message;
        player.chips += 50;
    }

    if(player.chips <= 0) { 
        message = "Game Over! You're out of chips. Please start a new game.";
        messageEl.textContent = message;
        isAlivePlayer = false;
        isAliveDealer = false;
    }


    if(isBlackJackDealer === false && dealerDecision === 0) {
        isAliveDealer = true;
        hitMeDealer();
    }


}