const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const settings = document.getElementById("settings");
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'

];
let randomWord;
let score = 0;
let time = 10;
//random word generator
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];

}

function updateScore() {
    score++
    scoreEl.innerHTML = score
}
//add word to dom
function addWord() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
addWord();

text.focus();

//set difficulty
let difficulty = localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") : "medium";

//set difficulty select value
difficultySelect.value=
localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") : "medium";

    
 
//count down

const countdown = setInterval(updateTime, 1000);

//update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + "s"
    if (time === 0) {
        clearInterval(countdown);
        gameOver();
    }
}

//event listener
text.addEventListener("input", e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWord();
        e.target.value = ""
        updateScore()
        if (difficulty==="hard"){
            time +=2;

        }
        else if (difficulty==="medium"){
            time+=3
        }
        else{
            time+=5
        }

updateTime()
    }
})
//game over
function gameOver() {
    endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button class="btn btn-danger"   onclick="location.reload()">Try again</button>
    `;
    endgameEl.style.display = "flex"
}


settingsForm.addEventListener("change", e => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
});