const startB = document.querySelector('#s-btn')
const boardCells = document.querySelectorAll('.cell')


let boardGrid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

startB.addEventListener('click', start);

function pickMove() {
    for (let i = 0; i < boardCells.length; i++) {
        let bCell = boardCells[i];
        bCell.addEventListener('click', function() {
         console.log('clicked');
        });
      }
}

function start() {
    pickMove();
}