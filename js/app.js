/*
 *  VARIABLES
 */
// cardsArray holds the list of cards
let cardsArray = [
        'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'bicycle', 'bomb', 'leaf'
    ]
    // Doubles the array to have matching cards
cardsArray = cardsArray.concat(cardsArray);

// firstCard - Variable keeps track if player is choosing first card or second card
let firstCard = true;

// openMatched Array - Array for holding the opened cards to be matched
let openMatched = [];


/*
 *  FUNCTIONS
 */

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

// Fn to reset. Delete previous cards, shuffle cards array, build new html.
function resetGame(cards) {
    //Remove cards
    $('li.card').remove();

    //shuffle Cards
    cards = shuffle(cards);

    //Build the shuffled deck in HTML for ul.deck to append
    for (i = 0; i < cards.length; i++) {
        strng = '<li class="card"> <i class="fa fa-' + cards[i] + '"> </i> </li>';
        $('.deck').append(strng);
        // Add Click functionality to each card in the deck
        setCardClick();
    }
}

// getGlyph receives a Card, returns the glyph of that card
// Used in matchCard function
function getGlyph(card) {
    // Get the glyph of this particular card
    glyph = card.innerHTML.split('"')[1].substring(6);
    //console.log()
    return glyph;
}

// Used in setCardClick to check if a card is closed or not.
function checkIfClosed(card) {
    if (card.classList == "card") {
        return true;
    } else {
        return false;
    }
}

function lockCards(card) {
    // Remove "open show" classes, add match class to the Card elements
    card.className = "card match";
}

function closeCards(card) {
    // Close the card that was just opened
    card.className = "card";
}

function matchCards() {
    // Check to see if the 2 cards glyph's Match
    if (getGlyph(openMatched[0]) == getGlyph(openMatched[1])) {
        lockCards(openMatched[0]);
        lockCards(openMatched[1]);
    } else {
        setTimeout(closeCards(openMatched[0]), 10000);
        setTimeout(closeCards(openMatched[1]), 3000);
    }
    // Remove both cards from openMatched Array
    openMatched.pop();
    openMatched.pop();
}


// setCardClick Fn Sets the OnClick listener for the cards
// Called when Game starts and restarts
function setCardClick() {
    // OnClick listener for li w/ class=card
    $('li.card').on('click', function(event) {
        // Stops the function from firing multiple times
        event.stopImmediatePropagation();
        //If the card is closed, flip it. If not Do nothing
        if (checkIfClosed(this)) {
            // Flip this card
            flipCard(this);
            // Add this card to the openMatched Array.
            openMatched.push(this);
            // If openMatched has 2 Cards in it, then Match those cards with matchCards fn
            // Matched or Not. Remove both cards from openMatched.
            if (openMatched.length == 2) {
                matchCards();
            }

        }
    });
}

/*
 *  RUN JAVASCRIPT
 */

// run js once DOM is ready
$(document).ready(function() {
    // Reset the Game (shuffle cards)
    resetGame(cardsArray);

    //OnClickLister for Reset Button
    $('div.restart').on('click', function() {
        resetGame(cardsArray);
    });

});


/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */