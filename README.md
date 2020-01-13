# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [How To Play](#howToPlay)
* [Loading the Game](#loadGame)
* [Code Files](#codeFiles)
* [Responsiveness](#responsiveness)
* [Javascript](#js)
* [Potential Modifications](#Mods)
* [License](#license)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## How To Play

This is a classic matching memory game. We have 16 cards, the player can open 2 at a time. When a player opens 2 cards, that is called a move. If in the move those 2 cards match, they stay open, if not they close back. The player must use his/her memory to make sure to open all the cards in the fewest moves possible. 15 moves or less gives a star rating of 3. 15 to 20 moves gives a star rating of 2. Beyond 20 moves gives a star rating of 1. The player is also timed so they can see how fast they move.

## Loading the Game

To load the game. Click on the index.html file. A browser should open and show the game layout. To start the Game, click on the 1st Card, the timer will then start.

## Code Files
index.html - holds the content of the game page. First, there's the title. Below that is the score panel which records number of moves, the star rating, and the reset button to reshuffle the deck and reset the timer.
Below the score panel is the timer which records the seconds and minutes. The main game occurs on the deck, which hold 16 cards with 8 pairs of images.

css/app.css - holds the styling elements of the game.
 
js/app.js - holds all the variables, functions, and code to be executed.

## Responsiveness
This game is responsive to different sizes as determined in the css/app.css file. If the viewing window is small enough at 630px, the deck gets smaller and the cards accomodate in proportion to maintain a nice look. The score panel also shrinks to accomodate smaller screens/windows.

## Javascript
When the page loads. The game is started using the resetGame function. A timer and scores are reset. The cards are set with onClickListeners that change the classes of those cards based on specific criteria. Cards are class "card" if they are facing down (not revieling the image).
When a card is opened in a move it contains the class "open show", and when it matches with another card, then it will have the class "match" but not contain "open show". 

When the game finishes (checked by the hasPlayerWon function). All the cards are removed from the deck, and the player is congratulated, statistics of their progress is displayed.

Delay - There are 2 seconds delays using he setTimeout function for when 2 cards don't match and are reverted closed and before the game checks when a player has matched all 16 cards.
Timer - the timer function uses the setInterval function.

## Potential Modifications
If more cards should be added to the game. Simply add those cards to the cardsArray array (just once for both pairs). The image of those cards must be glyphs that can be found in the bootstrap stylesheet called awesome fonts. 

Must change the hasPlayerWon function to activate when there are X number of cards (right now its 16).
Deck size should be modified accordingly in the css file based on number of cards.
 
## License


 
