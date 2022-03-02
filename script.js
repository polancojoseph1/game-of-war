class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}


class Deck {
  constructor() {
    this.length = 52;
    this.cards = [];
  }

  draw() {
    let cardIndex = Math.floor(Math.random() * this.length);
    let card = this.cards[cardIndex];
    this.length--;
    this.cards.splice(cardIndex, 1);
    return card || null;
  }

  shuffle() {
    this.cards = this.cards.sort((a, b) => 0.5 - Math.random());
  }
}

class Hand {
  constructor() {
    this.hand = []
  }
  make(array) {
    for (let i = 1; i <= 26; i++) {
      this.hand.push(array.pop());
    }
    this.shuffle()
  }
  draw() {
    this.shuffle();
    return this.hand.pop();
  }
  getCard() {
    this.hand.push(array.pop());
    this.shuffle();
  }
  war() {
    let array = [];
    for (let i = 1; i < 5; i++) {
      array.push((this.hand.pop() || deck.cards.pop()));
    }
    return array;
  }
  shuffle() {
    this.hand = this.hand.sort((a, b) => 0.5 - Math.random());
  }
}


let suits = ["hearts", "spades", "clubs", "diamonds"];
let ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "King", "Queen"];

let deck = new Deck();

for (let i = 0; i < suits.length; i++) {
  let suit = suits[i]
  for (let j = 0; j < ranks.length; j++) {
    let rank = ranks[j];
    let newCard = new Card(suit, rank, j + 1);
    deck.cards.push(newCard);
  }
}

deck.shuffle()





function game() {
  let playerOne = new Hand();
  let playerTwo = new Hand();
  playerOne.make(deck.cards);
  playerTwo.make(deck.cards);
  while (playerOne.hand.length > 0 && playerTwo.hand.length > 0) {
    let playerOneCard = playerOne.draw();
    let playerTwoCard = playerTwo.draw();
    if (!playerOneCard) console.log("Player Two Wins!");
    if (!playerTwoCard) console.log("Player One Wins!");
    if (playerOneCard.score > playerTwoCard.score) {
      playerOne.hand.push(playerOneCard, playerTwoCard);
    } else if (playerTwoCard.score > playerOneCard.score) {
      playerTwo.hand.push(playerOneCard, playerTwoCard);
    } else {
      let batch = [playerOneCard, playerTwoCard]
      let score1 = playerOneCard.score;
      let score2 = playerTwoCard.score;
      while (score1 === score2) {
        console.log("In war")
        let playerOneWarCards = playerOne.war();
        let playerTwoWarCards = playerTwo.war();
        let card1 = playerOneWarCards[playerOneWarCards.length - 1];
        let card2 = playerTwoWarCards[playerTwoWarCards.length - 1];
        if (!card1) return "Player Two Wins!";
        if (!card2) return "Player One Wins!";
        score1 = card1.score;
        score2 = card2.score;
        batch = [...batch, ...playerOneWarCards, ...playerTwoWarCards]
      }
      if (score1 > score2) {
        playerOne.hand.push(...batch)
      } else {
        playerTwo.hand.push(...batch)
      }
    }
  }
  return playerOne.hand.length > playerTwo.hand.length ? "Player One Wins!" : "Player Two Wins!";
}

console.log(game());