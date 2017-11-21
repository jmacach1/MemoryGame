// cardsArray holds the list of cards
let cardsArray = [
    'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'bicycle', 'bomb', 'leaf'
]
cardsArray.concat(cardsArray);

// firstCard - Variable keeps track if player is choosing first card or second card
let firstCard = true;

// prev - Holding variable for the first Card that was chosen
let prev;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Flip the card (li.card) to show it by adding open and show to its class
function flipCard(card) {
    card.classList.add('open', 'show');
}

// Set the cards(current and previous li.card's) to show they match, change class="card match" 
function matchFound(card, prev) {
    card.className = 'card match';
    prev.className = 'card match';
}

// run js once the page is ready
$(document).ready(function() {
    // OnClick listener for li w/ class=card
    $('li.card').on('click', function() {
        //If player is choosing the firstCard, then flip the card, set 'this' = prev, set firstCard = false
        if (firstCard) {
            flipCard(this);
            prev = this;
            firstCard = false;
        } else {
            flipCard(this);
            // See if the cards match 

            // We found a match! Set firstCard = true; prev = null
            matchFound(this, prev);
            firstCard = true;
            prev = null;
        }
    });
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */