let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O, false = X
let count = 0; // Track moves for draw condition

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset game
const resetGame = () => {
    turnO = true;
    count = 0; // Reset move count
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Adding click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
            box.classList.add("x-color");
        }
        box.disabled = true;
        turnO = !turnO;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Function to handle draw game
const gameDraw = () => {
    msg.innerText = "Game is a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes for new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true; // Stop further checking
        }
    }
    return false;
};

// Event listeners for resetting the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
