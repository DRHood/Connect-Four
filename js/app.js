/* global variables to use in functions */
const startB = document.querySelector('#s-btn'); //start button
const boardCells = document.querySelectorAll('.cell')
let gameActive = false; // used to prevent dropping cells once game is over
let activePlayer = 0; // # of active player - 1 or 2.  Default 0, no active player
let playerColor = []; //playerColor array
playerColor[1] = "red"; //player 1 "red" 
playerColor[2] = "yellow"; //player 2 "yellow"

// let gameBoard = []; // gameBoard as empty array
let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

startB.addEventListener('click', start);

function start() {
    if (gameActive == true) return false; 
    gameActive = true;
    for (row = 0; row <= 5; row++) {
        gameBoard[row] = [];
        for (col = 0; col <= 6; col++) {
            gameBoard[row][col] = 0;
        }	
    }		      
   