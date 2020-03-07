// FIRST ARRAY - QUESTIONS
let arrayQuestions = [
    'Commonly used data types do NOT include:',
    'The condition in an if/else statement is enclosed within ______.',
    'Arrays in JavaScript can be used to store ______.',
    'String values must be closed within ____ when being assigned to variables.',
    'A very useful tool used during development and debugging for printing content to the debugger is:'
]

// SECOND ARRAY - OPTIONS
let arrayOptions = [
    ['Strings', 'Booleans', 'Alerts', 'Numbers'],
    ['Quotes', 'Curly Brackets', 'Parentheses', 'Square Brackets'],
    ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the Above'],
    ['Commas', 'Curly Brackets', 'Quotes', 'Parentheses'],
    ['JavaScript', 'Terminal/Bash', 'For Loops', 'Console.log'],
]

// THIRD ARRAY - INDEX NO.S OF CORRECT OPTIONS
let arrayCorrect = [2, 1, 3, 2, 3]

// INDEXING CURRENT QUESTION ACCORDING TO QUESTION ARRAY
let currentQuestion = 0;
// INITIALISING COUNTDOWN TIMER TO 60 SECONDS
let seconds = 60 
let timer = document.getElementById('timer')
// TO INDICATE IF THE SELECTED OPTION IS CORRECT OR WRONG
let status = document.getElementById('status') 
let finalScore = document.getElementById('finalScore')
let quiz = document.getElementById("quiz");
let pageScore = document.getElementById("pageScore")
let startPage = document.getElementById("startPage")
let options = document.getElementById("options")
let timerInterval;

function countdown() {
    // HIDE THE MAIN SCREEN
    startPage.style.display = "none"

    // DISPLAY FIRST QUESTION
    quiz.style.display = "block"
    showQuestion(currentQuestion);
    timer.textContent = "Time: " + seconds;

    timerInterval = setInterval(function () {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            endQuiz(seconds);
        } else {
            seconds--;
            timer.textContent = 'Time:' + seconds;
        }
    }, 1000);
}
let startQuiz = document.getElementById("startQuizButton")

startQuiz.addEventListener("click", function () {
    countdown();
});

// CLICK START BUTTON DISPLAYS THE QUESTION PAGE
function showQuestion(q) {
    // FIRST ARRAY HAS 5 QUESTIONS WITH INDEX NUMBER 0 TO 4
    if (q > 4) {
        // END QUIZ AND DISPLAY SCORE
        clearInterval(timerInterval)
        endQuiz(seconds)
    } else {
        // DISPLAY QUESTIONS
        let element = document.getElementById("questions");
        element.textContent = arrayQuestions[q];

        // RESETTING OPTIONS-INNER HTML
        options.innerHTML = ""

        // DISPLAYING OPTIONS
        let choices = arrayOptions[q];
        for (let i = 0; i < choices.length; i++) {
            guess(q, i, choices[i]);
        }
    }
}

// CREATING BUTTONS FOR OPTIONS
function guess(q, id, choiceText) {
    let button = document.createElement("button")
    
    button.textContent = choiceText
    button.addEventListener('click', function () {
        if (id !== arrayCorrect[q]) {
            // IF SELECTED OPTION IS WRONG, DECREMENT TIMER BY 10 SECONDS
            seconds -= 10;
            timer.textContent = 'Time: ' + seconds;
            // DISPLAYING CORRECT OR WRONG
            status.textContent = "Wrong!"
        } else {
            status.textContent = "Correct!"
        }
        currentQuestion++;
        // NEXT QUESTION
        showQuestion(currentQuestion); 
    })
    // ADD BUTTON TO PAGE
    options.appendChild(button) 
}

// DISPLAY FINAL SCORE AFTER ENDING QUIZ
function endQuiz(score) {
    // HIDE QUIZ
    quiz.style.display = "none"

    finalScore.style.display = "block"
    document.getElementById('displayScore').textContent = "Your final score is " + score
}

// ENTER NAME TO HIGHSCORE
let scoreForm = document.getElementById("enterName")

scoreForm.addEventListener('submit', function (event) {
    let scoreList = document.getElementById("highScoreList")
    event.preventDefault()

    // GRAB NAME ENTERED BY USER
    let enteredName = document.getElementById("name").value

    // HIDE HGHSCORE FORM
    finalScore.style.display = "none"

    // CHECK IF NAME ENTERED
    if (enteredName.length > 0) {
        // DISPLAY TABLE
        pageScore.style.display = "block"
        // ADD SCORE LIST
        scoreList.innerHTML += `<li>${enteredName} - ${seconds}</li>`
    }
})
//VIEW HIGHSCORES BUTTON
let viewScores = document.getElementById("viewHighscores")
viewScores.addEventListener('click', function(){
    // HIDE MAIN/START PAGE
    startPage.style.display = "none"
    //DISPLAY HIGHSCORE PAGE
    pageScore.style.display = "block"
})
// GO BACK BUTTON
let goBack = document.getElementById("goBack")
goBack.addEventListener('click', function () {
    // HIDE SCORE PAGE
    pageScore.style.display = "none"

    //  RESET TIMER AND QUESTIONS
    seconds = 60
    currentQuestion = 0

    // SHOW MAIN PAGE
    startPage.style.display = "block"

})




