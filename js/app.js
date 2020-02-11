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
    setBoard(); // call function to draw board				
    activePlayer = 1; //set the first player turn
    setUpTurn(); //ready player turn
    pickDrop();
}
        
/* setBoard draw board - update each item to appropriate value */
function setBoard() {
    checkForWin(); //check if player has won
    for (col = 0; col <= 6; col++) {
        for (row = 0; row <= 5; row++) {
            //set inner HTML of cell (a td) to span with class of 'cell' and 'player' + value of that gameBoard cell
            document.getElementById('cell_' + row + '_' + col).innerHTML = "<span class='cell player" + gameBoard[row][col] + "'> </span>";
        }	
    }
}

function pickDrop() {
    for (let i = 0; i < boardCells.length; i++) {
        let bCell = boardCells[i];
        bCell.addEventListener('click', (e)=>{
            e.preventDefault();
            console.log(e.target.getAttribute('data-column'));        
          });
    }
}

function checkForWin() { 
    // function will check each winning situation for each player
    //check left-to-right
    //check for player 1 and 2
    for (i = 1; i <= 2; i++) {
        //winning row must be 4 long, only check first 3 rows
        for (col = 0; col <= 3; col++) {
            for (row = 0; row <= 5; row++) {
                //check if gameBoard is set to player being checked, if so, check the next 3
                if (gameBoard[row][col] == i) {
                    if ((gameBoard[row][col + 1] == i) && (gameBoard[row][col + 2] == i) && (gameBoard[row][col + 3] == i)) {
                        endGame(i);//match made, run EndGame for player with win
                        return true; //stop checking, game over
                    }
                }
            }
        }
    }
            
    //check top-to-bottom
    for (i = 1; i <= 2; i++) {
        //winning row must 4 long, only check first 3 rows
        for (col = 0; col <= 6; col++) {
            for (row = 0; row <= 2; row++) {
                //check if gameBoard item is set to player being checked, if so, check next 3
                if (gameBoard[row][col] == i) {
                    if ((gameBoard[row + 1][col] == i) && (gameBoard[row + 2][col] == i) && (gameBoard[row + 3][col] == i)) {
                        endGame(i); //match made, run endGame for player with match
                        return true; //stop checking, game over
                    }
                }
            }
        }
    }
     //check diagnol down
     for (i = 1; i <= 2; i++) {
        //winning row must be 4 long, only check the first 3 rows
        for (col = 0; col <= 3; col++) {
            //also only check the bottom most columns, win must be upwards
            for (row = 0; row <= 2; row++) {
                //check if gameBoard item is set to player being checked, if so, check next 3
                if (gameBoard[row][col] == i) {
                    if ((gameBoard[row + 1][col + 1] == i) && (gameBoard[row + 2][col + 2] == i) && (gameBoard[row + 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }
                            
    //check diagnol up
    for (i = 1; i <= 2; i++) {
        //winning row must be 4 long, only check the first 3 rows,
        for (col = 0; col <= 3; col++) {
            //only check the bottom most columns, win must be upwards
            for (row = 3; row <= 5; row++) {
                //check if gameBoard is set to player being checked, if so, check next 3
                if (gameBoard[row][col] == i) {
                    if ((gameBoard[row - 1][col + 1] == i) && (gameBoard[row - 2][col + 2] == i) && (gameBoard[row - 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }
}

/* endGame will end the game - any additional functions or things you want to happen when the game is over can go here */
function endGame(winningPlayer) {
    gameActive = false; //set the "gameActive" to false, so that it can be started again.
    document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer; //set the "game_info" to the winner and the winning player #
}

/* setUpTurn display active player */
function setUpTurn() {
    if (gameActive) {
        //display current player, create <span> with class of player# & color
        document.getElementById('game_info').innerHTML = "Current Player: Player " + activePlayer + " <span class='player" + activePlayer + "'>(" + playerColor[activePlayer] + ")</span>";
    }
}

function drop(col) {
    for (row = 5; row >= 0; row--) {
        if (gameBoard[row][col] == 0) {
            //set empty row to active player
            gameBoard[row][col] = activePlayer;
            //change the active players turn:
            activePlayer = (activePlayer == 1) ? 2 : 1;
                    
            setUpTurn(); //display active player

            //stop looking for empty spaces
            return true;
        }
    }
}