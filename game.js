const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which country hosted Olympic games 2020?',
        choice1: 'USA',
        choice2: 'China',
        choice3: 'Japan',
        choice4: 'India',
        answer: 3,
    },
    {
        question: 'What is the Capital of Spain?',
        choice1: 'Madrid',
        choice2: 'Lisbon',
        choice3: 'Paris',
        choice4: 'Moscow',
        answer: 1,
    },
    {
        question: 'What is the Currency of Russia?',
        choice1: 'Dirham',
        choice2: 'Dollar',
        choice3: 'Yen',
        choice4: 'Ruble',
        answer: 4,
    },
    {
        question: 'What is the Rank of India in 2020 Global Hunger Index',
        choice1: '107',
        choice2: '89',
        choice3: '94',
        choice4: '101',
        answer: 3,
    },
    {
        question: 'Who is the current Governor of RBI?',
        choice1: 'Urijit Patel',
        choice2: 'Shaktikanta Das',
        choice3: 'Raghuram Rajan',
        choice4: 'Nirmala Sitharaman',
        answer: 2,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>{
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    ProgressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100%}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })    
    availableQuestions.splice(questionsIndex, 1)  
    acceptingAnswers = true 
     
}

choices.forEach(choice =>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()