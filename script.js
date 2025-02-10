// Function to enable full-screen mode automatically on mobile
function goFullScreen() {
    let doc = document.documentElement;

    if (doc.requestFullscreen) {
        doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) { // Firefox
        doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) { // Chrome, Safari, Opera
        doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) { // IE/Edge
        doc.msRequestFullscreen();
    }
}

// Automatically trigger full-screen mode on mobile
document.addEventListener("DOMContentLoaded", function () {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        goFullScreen();
    }
});

// Card Class
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.rankValue = this.getRankValue(rank);
        this.color = this.getSuitColor(suit);
    }

    getRankValue(rank) {
        const rankValues = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
            '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
        return rankValues[rank] || 0;
    }

    
  getSuitColor(suit) {
    return ['♥', '♦'].includes(suit) ? 'red' : 'black';
  }

  // Create the HTML structure for the card
  createCardElement() {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'text-bg-light', 'mb-3', 'rounded-1');

    // Bottom rank (this will appear at the top of the card)
    const bottomRankDiv = document.createElement('div');
    bottomRankDiv.classList.add('card-rank', 'card-rank-top');
    bottomRankDiv.textContent = this.rank;
    bottomRankDiv.style.color = this.color; // Apply color based on the suit's color

    // Add the smaller suit to the top rank (this is the new top)
    const suitElementTop = document.createElement('span');
    suitElementTop.classList.add('card-suit');
    suitElementTop.textContent = this.suit;
    suitElementTop.style.color = this.color; // Apply color based on the suit's color
    bottomRankDiv.appendChild(suitElementTop);
    cardDiv.appendChild(bottomRankDiv);

    // Card body with suit or icon in the middle
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const suitTitle = document.createElement('h5');
    suitTitle.classList.add('card-title');

    if (this.rank === 'J') {
      suitTitle.innerHTML = '<img src="J.heic" alt="Boy" style="width: 20px; height: 40px;">'; // Boy icon for J
    } else if (this.rank === 'Q') {
      suitTitle.innerHTML = '<img src="J.heic" alt="Boy" style="width: 20px; height: 40px;">'; // Girl icon for Q
    } else if (this.rank === 'K') {
      suitTitle.innerHTML = '<img src="J.heic" alt="Boy" style="width: 20px; height: 40px;">'; // Old Man icon for K
    } else {
      suitTitle.textContent = this.suit; // Suit for other ranks
      suitTitle.style.color = this.color; // Apply color based on the suit's color
    }

    cardBodyDiv.appendChild(suitTitle);
    cardDiv.appendChild(cardBodyDiv);

    // Top rank (this will appear at the bottom of the card)
    const topRankDiv = document.createElement('div');
    topRankDiv.classList.add('card-rank', 'card-rank-bottom');
    topRankDiv.textContent = this.rank;
    topRankDiv.style.color = this.color; // Apply color based on the suit's color

    // Add the smaller suit to the bottom rank (this is the new bottom)
    const suitElementBottom = document.createElement('span');
    suitElementBottom.classList.add('card-suit');
    suitElementBottom.textContent = this.suit;
    suitElementBottom.style.color = this.color; // Apply color based on the suit's color
    topRankDiv.appendChild(suitElementBottom);
    cardDiv.appendChild(topRankDiv);

    return cardDiv;
  }
}

// Create a deck of cards with 2 red suits and 2 black suits
const suits = ['♥', '♦', '♣', '♠'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];

// Generate all cards
for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(new Card(rank, suit));
  }
}

// Function to shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
  }
}

// Function to generate 13 random cards for the game
function generateThirteenCards() {
  // Shuffle the deck
  shuffleDeck();

  // Get the first 13 cards
  const selectedCards = deck.slice(0, 13);

  // Render cards into the DOM
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''; // Clear previous cards

  selectedCards.forEach(card => {
    cardContainer.appendChild(card.createCardElement());
  });
}

// Add event listener to the button
const generateButton = document.getElementById('generate-cards');
generateButton.addEventListener('click', generateThirteenCards);