
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let acceptingInput = false;

let h2 = document.querySelector("h2");

function startGame() {
    if (started) return;

    started = true;
    document.body.style.backgroundColor = "white";
    levelUp();
}

// Start with keyboard
document.addEventListener("keydown", startGame);

// Start by tapping outside the game buttons on mobile
document.addEventListener("click", function (event) {
    if (!started && !event.target.closest(".btn")) {
        startGame();
    }
});

// Game button flash
function gameFlash(btn) {
    if (!btn) return;

    btn.classList.add("gameflash");

    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 250);
}

// User button flash
function userFlash(btn) {
    if (!btn) return;

    btn.classList.add("userflash");

    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Correct answer flash
function flashCorrect(btn) {
    if (!btn) return;

    btn.classList.add("correct");

    setTimeout(() => {
        btn.classList.remove("correct");
    }, 250);
}

// Wrong answer flash
function flashWrong(btn) {
    if (!btn) return;

    btn.classList.add("wrong");

    setTimeout(() => {
        btn.classList.remove("wrong");
    }, 250);
}

// Increase level and show next color
function levelUp() {
    if (!started) return;

    acceptingInput = false;
    userSeq = [];

    level++;

    if (h2) {
        h2.innerText = `Level ${level}`;
    }

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    if (randBtn) {
        gameFlash(randBtn);
    } else {
        console.error("Button not found for color:", randColor);
        return;
    }

    // Allow input after the flash
    setTimeout(() => {
        if (started) {
            acceptingInput = true;
        }
    }, 350);
}

// Check user's answer
function check(idx) {
    if (!started || !acceptingInput) return;

    if (gameSeq[idx] === userSeq[idx]) {
        let correctBtn = document.getElementById(userSeq[idx]);
        flashCorrect(correctBtn);

        // Completed the full sequence
        if (userSeq.length === gameSeq.length) {
            acceptingInput = false;
            setTimeout(levelUp, 800);
        }
    } else {
        let wrongBtn = document.getElementById(userSeq[idx]);
        flashWrong(wrongBtn);

        if (h2) {
            h2.innerHTML =
                `Game Over! Your score was <b>${level - 1}</b>` +
                `<br>Tap anywhere to start again`;
        }

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

// Reset game
function reset() {
    started = false;
    acceptingInput = false;

    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Handle user button press
function btnPress() {
    // First button tap starts the game instead of causing Game Over
    if (!started) {
        startGame();
        return;
    }

    if (!acceptingInput) return;

    let btn = this;
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    userFlash(btn);

    check(userSeq.length - 1);
}

// Add click events to all game buttons
let allBtns = document.querySelectorAll(".btn");

allBtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});
