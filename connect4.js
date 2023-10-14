let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;
// array to track column height; define in setGame(); update R in setPiece() 
let currColumns;

let rows = 6;
let columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    // populates tiles in the board - 2d array
    board = [];
    // all 7 columns: index 0-5; start at 5:
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(" ");
            
            // HTML - creating the divs (would have been 42 on html page): <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if (gameOver) {
        // if game is over (there's a winner), setPiece does nothing
        return;
    }
    // if not game over, get coordinates
    let coords = this.id.split("-"); // split at the hyphen: "0-0 --> ["0", "0"]
    // because they are strings in an array, parseInt them
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    console.log(coords);

    // update R
    r = currColumns[c];
    if (r < 0) {
        //cannot place a piece in a full row:
        return;
    }

    board[r][c] = currPlayer;
    // same for HTML; before code for r was updated: 
    // let tile = this; //after code for r was updated:
    let tile = document.getElementById(r.toString() + "-" + c.toString()); // update r below

    // check current player
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } 
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }
    
    r -= 1;  // update row height for the column; subtract by 1 to move up a row:
    currColumns[c] = r;  // update array:

    checkWinner();
}

function checkWinner() {
    // sliding window checking
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) { // -3 = check 3 ahead w/o going out of bounds 
            if (board[r][c] != " ") {
                if (board[r][c] == board[r][c+1] && 
                    board[r][c+1] == board[r][c+2] &&
                    board[r][c+2] == board[r][c+3]) {
                        setWinner(r, c);
                        return;
                }
            }
        }
    }  
    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows -3; r++){
            if (board[r][c] != " ") {
                if (board[r][c] == board[r+1][c] && 
                    board[r+1][c] == board[r+2][c] &&
                    board[r+2][c] == board[r+3][c]) {
                        setWinner(r, c);
                        return;
                }
            } 
        }
    }  
    //anti-diagonal in 3 loops
    for (let r = 0; r < rows -3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r+1][c+1] && 
                    board[r+1][c+1] == board[r+2][c+2] &&
                    board[r+2][c+2] == board[r+3][c+3]) {
                        setWinner(r, c);
                        return;
                }
            }
        }
    }
    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r-1][c+1] && 
                    board[r-1][c+1] == board[r-2][c+2] &&
                    board[r-2][c+2] == board[r-3][c+3]) {
                        setWinner(r, c);
                        return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!"
        winner.style.color = "red";
        winner.style.backgroundColor = "black";
    } else {
        winner.innerText = "Yellow Wins!"
        winner.style.color = "yellow";
        winner.style.backgroundColor = "black";
    }
    gameOver = true;
}