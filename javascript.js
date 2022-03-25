var falseBtn = document.querySelector("#falseButton");
var trueBtn = document.querySelector("#trueButton");
var quizBoxEl = document.querySelector(".quizBox");
var quizText = document.querySelector("#quizQuestions");
var startBtn = document.querySelector(".start-btn");
var answerBtns = document.querySelectorAll(".answerButton");
var timerEl = document.querySelector(".timer");
var scoreArea = document.querySelector(".scoreArea");
var questionList = [
  { question: "I grew up playing drums", answer: "true" },
  { question: "I grew up on the west coast", answer: "false" },
  { question: "I have a dog named Zion", answer: "true" },
  { question: "I went to Penn state for College", answer: "true" },
  { question: "I used to be a gymnast", answer: "false" },
];
console.log(questionList);

var savedScores = JSON.parse(localStorage.getItem("scoresList")) || [];

var questionIndex = 0;
var userScore = 0;
var timeLeft = 60;
var correctAnswer;


function evaluateAnswer(answer, userRes) {
    trueBtn.removeEventListener("click", trueFn);
    falseBtn.removeEventListener("click", falseFn);
  if (answer === userRes) {
    console.log("correct!");
    userScore++;
  } else {
    console.log("wrong!");
    timeLeft -= 10;
  }
  questionIndex++;
  if (questionIndex > 4) {
      gameOver();
  }  else {
      renderQuestion();
  }
  
}

function falseFn() {
    evaluateAnswer(correctAnswer, "false");
    console.log("false-Btn");
  }

  function trueFn() {
    evaluateAnswer(correctAnswer, "true");
    console.log("true-Btn");
  }


startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  startTimer();
  renderQuestion();
});

function startTimer() {
  setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
  }, 1000);
}

// QuizText.style.display = "none";

function gameOver() {
  trueBtn.style.display = "none";
  falseBtn.style.display = "none";
  quizText.style.display = "none";
  renderScores();
}

function renderQuestion() {
  quizText.textContent = questionList[questionIndex].question;

   correctAnswer = questionList[questionIndex].answer;


  trueBtn.addEventListener("click", trueFn);
  falseBtn.addEventListener("click", falseFn);
}

function renderScores() {
 var h2El = document.createElement("h2")
 h2El.textContent = `Your score: ${userScore} / ${questionList.length}`
 scoreArea.append(h2El)
 var input = document.createElement("input")
 input.placeholder="user initials"
 var button = document.createElement("button")
 button.textContent = "save score"
 scoreArea.append(input)
 scoreArea.append(button)
 button.addEventListener("click", function() {
    var data = input.value;
    localStorage.setItem("userScore", JSON.stringify([data, userScore])) 
 })
}

