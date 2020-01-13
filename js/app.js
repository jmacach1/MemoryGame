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

// Record number of moves
let moves = 0;

// Used to take the ID of setInterval function in the runTimer fn. To stop it later.
let intervalID;


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

function countMoves(moves) {
    // Show the number of moves 
    $('span.moves').text(moves);
}

function stars(moves) {
    // Update the moves for the star counter. Less than 15 = 3 stars
    // 15 - 20, 2 stars. Over 20, 1 star
    if (moves < 15) {
        $('.stars').empty();
        strng = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class = "fa fa-star"></i></li >' +
            '<li><i class = "fa fa-star"> </i></li>';
        $('.stars').append(strng);
    } else if (15 < moves && moves < 20) {
        $('.stars').empty();
        strng = '<li><i class="fa fa-star"></i></li>' +
            '<li><i class="fa fa-star"></i></li>';
        $('.stars').append(strng);
    } else if (moves > 20) {
        $('.stars').empty();
        strng = '<li><i class="fa fa-star"></i></li>';
        $('.stars').append(strng);

    }
}


// Flip the card (li.card) to show it by adding open and show to its class
function flipCard(card) {
    card.classList.add('open', 'show');
}

// Fn to reset. Delete previous cards, shuffle cards array, build new html.
function resetGame(cards) {
    // Reset moves counter
    moves = 0;
    countMoves(moves);
    //Reset stars rating
    stars(moves);
    //Remove cards and everything on the deck
    $('.deck').empty();

    //shuffle Cards
    cards = shuffle(cards);

    //Build the shuffled deck in HTML for ul.deck to append
    for (i = 0; i < cards.length; i++) {
        strng = '<li class="card"> <i class="fa fa-' + cards[i] + '"> </i> </li>';
        $('.deck').append(strng);
        // Add Click functionality to each card in the deck
        setCardClick();
        // Stop timer. Set it to Zero
        clearInterval(intervalID);
        setTimertoZero();
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

function close(cards) {
    closeCards(cards[0]);
    closeCards(cards[1]);
}

function matchCards() {
    // Check to see if the 2 cards glyph's Match
    if (getGlyph(openMatched[0]) == getGlyph(openMatched[1])) {
        // Match = Lock cards in place, change class to "card match"
        lockCards(openMatched[0]);
        lockCards(openMatched[1]);
        //Check to see if the player has won
        hasPlayerWon();
    } else {
        // Delay closing the cards with setTimeout.
        // Turn off the click listeners for the Cards while the 2 are showing.
        $("li.card").css("pointer-events", "none");
        setTimeout(closeCards, 1500, openMatched[0]);
        setTimeout(closeCards, 1500, openMatched[1]);
        // Reestablish pointer function for the Cards after the 2 flipped back 
        setTimeout(function() {
            $("li.card").css("pointer-events", "auto");
        }, 2000);

    }
    // Remove both cards from openMatched Array
    openMatched.pop();
    openMatched.pop();
}

function setGameStart() {
    // Clear the last timer. Start a new one.
    clearInterval(intervalID);
    runTimer();
}

// setCardClick Fn Sets the OnClick listener for the cards
// Called when Game starts and restarts
function setCardClick() {
    // OnClick listener for li w/ class=card
    $('li.card').on('click', function(event) {
        // Stops the function from firing multiple times
        event.stopImmediatePropagation();
        if (moves == 0) {
            setGameStart();
        }
        moves++;
        //If the card is closed, flip it. If not Do nothing
        if (checkIfClosed(this)) {
            // Flip this card
            flipCard(this);
            // Add this card to the openMatched Array.
            openMatched.push(this);
            // Update the moves counter, Star rating. If openMatched has 2 Cards, Match them with matchCards fn
            // Matched or Not. Remove both cards from openMatched.
            if (openMatched.length == 2) {
                let move = moves / 2;
                countMoves(move);
                matchCards();
                stars(move);
            }
        }
    });
}

// Check to see if player won.
function hasPlayerWon() {
    matched = 0;
    $('li.card').each(function(index, element) {
        if (element.classList.contains("match")) {
            matched++;
        }
        if (matched == 16) {
            setTimeout(function() {
                // If Player won, then remove the cards. 
                // Tell the player they won. Star rating. Time. and Play Again
                $('li.card').remove();
                star = $('.stars').html();
                $('.deck').append("<div><h1> CONGRATULATIONS YOU WON!</h1> <br> " +
                    "<h2>Time: " + stopTimer() +
                    "</h2><br><h2>Number of Moves: " + moves +
                    "</h2><h2 class='starRating'> <br> Star Rating: " + star +
                    "<h2 class='reset'><br><u>PLAY AGAIN</u></h2></div>");
                $('.deck .reset').on('click', function() { resetGame(cardsArray); });
                $('.starRating li').css("list-style", "none")
                $('.starRating li').css("display", "inline-block")
            }, 2000);
        }
    });
}

function setTimertoZero() {
    // Sets the Timer to display Zero.
    $('div.timer').empty();
    $('div.timer').append('<h4>Time: <span id="minutes">00</span> : <span id="seconds">00</span></h4>');
}

function runTimer() {
    // Run Timer in seconds and minutes
    setTimertoZero();
    var sec = 0;

    function pad(val) { return val > 9 ? val : "0" + val; }
    intervalID = setInterval(function() {
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec / 60, 10)));
    }, 1000);
}

function stopTimer() {
    // stop the Timer and have the time when it stopped displayed
    var seconds = $("#seconds").html();
    var minutes = $("#minutes").html();
    // stop the setInterval function
    clearInterval(intervalID);
    // Display the time
    $('div.timer').append('<h4>Time: <span id="minutes">00</span> : <span id="seconds">00</span></h4>');
    $('div.timer').empty();
    $('div.timer').append('<h4>Time: <span id="min">' + minutes + '</span> : <span id="se">' + seconds + '</span></h4>');
    return minutes + " : " + seconds;
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