document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.querySelector(".reset");
    const boxes = document.querySelectorAll(".box");
    const header = document.querySelector(".header");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Add click event listener to each box
    boxes.forEach(box => {
        box.addEventListener("click", handleBoxClick);
    });

    // Add click event listener to reset button
    resetButton.addEventListener("click", resetGame);

    function handleBoxClick(event) {
        const boxId = event.target.id;

        if (gameBoard[boxId] === "" && !checkWinner()) {
            gameBoard[boxId] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                header.textContent = `Player ${currentPlayer} wins!`;
                disableBoxes();
            } else if (!gameBoard.includes("")) {
                header.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                header.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function disableBoxes() {
        boxes.forEach(box => {
            box.style.pointerEvents = "none";
        });
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        header.textContent = "Let's play!!!";
        boxes.forEach(box => {
            box.textContent = "";
            box.style.pointerEvents = "auto";
        });
    }
});
