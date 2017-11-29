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
// Used in setCardClick fn
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

// function matchCards() {
//     if (openMatched[0] == openMatched[1]) {} else {}
// }


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
            openMatched.push(getGlyph(this));
            // If openMatched has 2 Cards in it, then Match those cards with matchCards fn
            // Matched or Not. Remove both cards from openMatched.
            if (openMatched.length == 2) {
                //matchCards();
            }

        } else {
            console.log("Hey this is open already")
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
 * set up the event listener for a card. If a card is clicked:
 *  Check- display the card's symbol (put this functionality in another function that you call from this one)
 *  Check- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */