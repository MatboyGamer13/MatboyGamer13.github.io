const squares = document.querySelectorAll("td");

const whitePieces = document.querySelectorAll(".white");
const blackPieces = document.querySelectorAll(".black");

const pawns = document.querySelectorAll(".pawn");
const rooks = document.querySelectorAll(".rook");
const knights = document.querySelectorAll(".knight");
const bishops = document.querySelectorAll(".bishop");
const queens = document.querySelectorAll(".queen");
const king = document.querySelectorAll(".king");

let isWhite = true;

let nOfPieces = 0;
let selectedPiece = null;

if (isWhite) {
  for (let i = 0; i < whitePieces.length; i++) {
    const white = whitePieces[i];

    white.addEventListener("click", handlePieceClick);
  }
} else {
  for (let i = 0; i < blackPieces.length; i++) {
    const black = blackPieces[i];

    black.addEventListener("click", handlePieceClick);
  }
}

function handlePieceClick(event) {
  const piece = event.target;

  if (selectedPiece === piece) {
    // Deselect the piece
    piece.classList.remove("selected");
    selectedPiece = null;
  } else {
    // Select the piece
    if (selectedPiece) {
      // Deselect the previously selected piece
      selectedPiece.classList.remove("selected");
    }
    piece.classList.add("selected");
    selectedPiece = piece;
  }
}

for (let i = 0; i < squares.length; i++) {
  const square = squares[i];

  square.addEventListener("click", handleSquareClick);
}

function handleSquareClick(event) {
  const square = event.target;

  if (selectedPiece) {
    // Move the selected piece to the clicked square
    square.innerHTML = selectedPiece.innerHTML;
    selectedPiece.innerHTML = "";
    selectedPiece.classList.remove("selected");
    selectedPiece = null;

    // Switch turns
    isWhite = !isWhite;
  }
}
