//Selecting elements from the DOM

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const countQuestionText = document.getElementById("countQuestions");
const scoresText = document.getElementById("score");
const nxtButton = document.getElementById("Btn");
const correctQuestion = document.getElementById("correctAns");

//Assigning variables
let currQuestions = {};
let takeAnswers = false;
let score = 0;
let countQuestions = 0;
let questionChoice1 = document.getElementById("choice1");
let questionChoice2 = document.getElementById("choice2");
let questionChoice3 = document.getElementById("choice3");
let questionChoice4 = document.getElementById("choice4");
let availableQuestions = [];
let selectedAns = undefined;
let selectedChoice = undefined;
let classToUse = "";
let correctAnswer = 0;

//Array of Questions and Choices
let questions = [
    {
        question: "Which of the following statements is correct?",
        choice1 : "Health promotion can refer to any event process or activity that facilitates the protection or improvement of the health status of individuals, groups, communities and population.",
        choice2 :  "The objective of health promotion is to prolong life and to improve quality of life.",
        choice3 :  "Health promotion practice is often shaped by how health is conceptualized",
        choice4 :  "All of the above.",
        answer  : 4
    },

    {
        question: "Which of the following charters defined health promotion as the process of enabling people to increase control over, and to improve their health?",
        choice1 : "Charter of the United Nations (1945).",
        choice2 : "Tokyo Charter (1946).",
        choice3 : "Ottawa Charter (1986).",
        choice4 : "None of the above.",
        answer : 3
    },

    {
        question: "This approach to health promotion is synonymous with health education",
        choice1 : "behaviour change approach.",
        choice2 : "community development approach.",
        choice3 : "biomedical approach.",
        choice4 : "statistical approach.",
        answer : 1
    },

    {
        question: "Which of the following refers to a programme that aims to enable patients to make better use of information and communication technology for health and healthcare?",
        choice1 : "Information Technology",
        choice2 : "ICT health.",
        choice3 : "Health-Tech",
        choice4 : "Patient Informatics",
        answer : 4
    },

    {
        question: "Which of the following is a general term used to refer to the application of digital information and communication technology to healthcare?",
        choice1 : "digi-health",
        choice2 : "e-health",
        choice3 : "i-health",
        choice4 : "tech-health",
        answer : 2
    }

]

//Constants needed for quiz app

const correctPoint = 10;
const maxQuestions = 5;



function startQuiz () {
    countQuestions = 0;
    score = 0;
    availableQuestions = [...questions];
    correctAnswer = 0;
    getNewQuestion();
}

//function to get new questions
function getNewQuestion () {
    selectedAns = undefined;
    if(availableQuestions.length === 0 || countQuestions >= maxQuestions) {
        localStorage.setItem('endScore', score);
        return window.location.assign("finish.html");
    }

    //displays score of correctly answered questions
    countQuestions ++;
    countQuestionText.innerText = `${countQuestions} / ${maxQuestions}`
    

    //randomly selects questions
    const indQuestion = Math.floor(Math.random() * availableQuestions.length);
    currQuestions = availableQuestions[indQuestion];
    question.innerText = currQuestions.question;

    //displays different choices
    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currQuestions['choice' + number];
    })

    availableQuestions.splice(indQuestion, 1);
    takeAnswers = true;
}


choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!takeAnswers) return;

        takeAnswers = false;
        selectedChoice = e.target;
         selectedAns = selectedChoice.dataset["number"];
        
        classToUse = selectedAns == currQuestions.answer ? "correct" : "wrong";

        //upates score and gives color to correct and wrong choices
        if(classToUse == "correct"){
            incrScore(correctPoint); 
            correctAnswer ++;
            correctQuestion.innerHTML = `${correctAnswer} / ${maxQuestions}`

            selectedChoice.parentElement.classList.add(classToUse);
        } else {
            selectedChoice.parentElement.classList.add(classToUse);

            if(currQuestions.answer === 1 ) {
                questionChoice1.classList.add("correct");
            } else if (currQuestions.answer === 2 ) {
                questionChoice2.classList.add("correct");
            } else if(currQuestions.answer === 3 ) {
                questionChoice3.classList.add("correct");
            }else if (currQuestions.answer === 4 ) {
                questionChoice4.classList.add("correct");
            }
        }
        
    })
})

    //activates new question when next button is clicked
    nxtButton.addEventListener('click', (event) => {
        if(!selectedAns) return;
                
        questionChoice1.classList.remove("correct");
        questionChoice2.classList.remove("correct");
        questionChoice3.classList.remove("correct");
        questionChoice4.classList.remove("correct"); 
        selectedChoice.parentElement.classList.remove(classToUse);
            
        getNewQuestion();
     });
           
    
        

    //score increment
    incrScore = num => {
        score += num;
        scoresText.innerText = score;
    };

startQuiz();