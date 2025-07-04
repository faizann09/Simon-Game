let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => btn.classList.remove("gameflash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function flashCorrect(btn) {
    btn.classList.add("correct");
    setTimeout(() => btn.classList.remove("correct"), 250);
}

function flashWrong(btn) {
    btn.classList.add("wrong");
    setTimeout(() => btn.classList.remove("wrong"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function check(idx) {
    console.log("Checking index:", idx);
    if (gameSeq[idx] === userSeq[idx]) {
        let correctBtn = document.getElementById(userSeq[idx]);
        flashCorrect(correctBtn);

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let wrongBtn = document.getElementById(userSeq[idx]);
        flashWrong(wrongBtn);

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start ...`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn);
    check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

