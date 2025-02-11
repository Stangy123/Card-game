// Function to enable full-screen mode automatically
function goFullScreen() {
  let doc = document.documentElement;
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  } else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen();
  } else if (doc.webkitRequestFullscreen) {
    doc.webkitRequestFullscreen();
  } else if (doc.msRequestFullscreen) {
    doc.msRequestFullscreen();
  }
}

// Automatically enable full-screen mode on page load
document.addEventListener("DOMContentLoaded", function() {
  goFullScreen();
  distributeCards(); // Distribute cards when the page loads
});

// Set the player who sees all 13 cards
const currentPlayer = 2; // Change this to test different players (1-4)

// Card class
class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  createCardElement(isVisible) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add(isVisible ? 'card' : 'hidden-card');

    if (isVisible) {
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('card-content');

      // Determine color
      const isRed = (this.suit === '♥' || this.suit === '♦');
      const textColor = isRed ? 'red' : 'black';

      // Rank (Top)
      const rankTop = document.createElement('div');
      rankTop.textContent = this.rank;
      rankTop.style.color = textColor;
      rankTop.classList.add('rank-top');
      contentDiv.appendChild(rankTop);

      // Suit (Middle)
      const suitDiv = document.createElement('div');
      suitDiv.textContent = this.suit;
      suitDiv.style.color = textColor;
      suitDiv.style.fontSize = '24px';
      contentDiv.appendChild(suitDiv);

      // Rank (Bottom)
      const rankBottom = document.createElement('div');
      rankBottom.textContent = this.rank;
      rankBottom.style.color = textColor;
      rankBottom.classList.add('rank-bottom');
      contentDiv.appendChild(rankBottom);

      cardDiv.appendChild(contentDiv);
    }
    return cardDiv;
  }
}

// Generate deck of 52 cards
const suits = ['♥', '♦', '♣', '♠'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];

// Create the deck
for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(new Card(rank, suit));
  }
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
  }
}

// Distribute cards to 4 players
function distributeCards() {
  shuffleDeck();

  const playerContainers = [
    document.getElementById('player1'),
    document.getElementById('player2'),
    document.getElementById('player3'),
    document.getElementById('player4'),
  ];

  // Clear previous cards
  playerContainers.forEach(container => container.innerHTML = '');

  // Assign 13 cards to each player
  for (let i = 0; i < 4; i++) {
    let playerHand = deck.slice(i * 13, (i + 1) * 13);

    if (i + 1 === currentPlayer) {
      // Player 2 gets all 13 cards (stacked vertically)
      playerHand.forEach(card => {
        const cardElement = card.createCardElement(true);
        cardElement.addEventListener('click', () => toggleCardSelection(cardElement));
        playerContainers[i].appendChild(cardElement);
      });
    } else {
      // Players 1, 3, and 4 only get 1 visible card (stacked vertically)
      const cardElement = playerHand[0].createCardElement(true);
      cardElement.addEventListener('click', () => toggleCardSelection(cardElement));
      playerContainers[i].appendChild(cardElement);
    }
  }
}

// Toggle card selection
function toggleCardSelection(cardElement) {
  cardElement.classList.toggle('selected');
}

// Handle Pass button click
document.getElementById('pass-button').addEventListener('click', () => {
  alert('Passed!');
});

// Handle Discard button click
document.getElementById('discard-button').addEventListener('click', () => {
  const selectedCards = document.querySelectorAll('.card.selected');
  const discardPile = document.getElementById('discard-pile');

  selectedCards.forEach(card => {
    discardPile.appendChild(card);
    card.classList.remove('selected');
  });
});