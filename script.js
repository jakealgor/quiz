const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreDiv = document.getElementById('scores')
const highScore = document.getElementById('highscores')
const finalScore = document.getElementById('final-score')
const initials = document.getElementById('initials')



let count = 2;
let point = 0;

function settimer() {
    var counter = setInterval(function(){
        count--;
        document.getElementById("timer").innerHTML = count;
        if (count === 0){
            clearInterval(counter)
            gameover();
        }
    }
    , 1000);
}

function setpoints() {
    var points = setInterval(function(){
        points ++;
        document.getElementById("points").innerHTML = point;
    })
}

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    settimer();
    setNextQuestion();
    setpoints();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    // console.log(correct)
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if (!correct) {
        count -= 5;
        point -= 2;
    } else {
        count += 10;
        point += 10
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


function gameover() {
    questionContainerElement.classList.add('hide')
    nextButton.classList.add('hide')
    scores.classList.remove('hide')
    finalScore.textContent = point
    
}


const questions = [
    {
        question: 'What is 2 + 4?',
        answers: [
            { text: '6', correct: true },
            { text: '-1', correct: false },
            { text: '18', corrct: false },
            { text: '16', correct: false }
        ]

    },
    {
        question: 'What color is the sun?',
        answers: [ 
            { text: 'Blue', correct: false },
            { text: 'Green', correct: false },
            { text: 'Yellow', correct: true },
            { text: 'Purple', correct: false }
        ]
    },
    {
        question: 'What is the 62nd number in pi?',
        answers: [
            { text: '3', correct: false },
            { text: '9', correct: true },
            { text: '2', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true },
            { text: '7', correct: false },
            { text: '9', correct: false },

        ]
    },
    {
        question: 'Which of these colors are not in the rainbow',
        answers: [
            { text: 'Yellow', correct: false },
            { text: 'Green', correct: false },
            { text: 'Violet', correct: false },
            { text: 'Brown', correct: true }
        ]
    },
    {
        question: 'What is 10/5?',
        answers: [
            { text: '2', correct: true },
            { text: '3', correct: false },
            { text: '8', correct: false },
            { text: '15', correct: false }
        ]
    },




]
