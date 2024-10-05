const questions = [
    {
        questions: "Which is largest animal in the World?",
       answers : [
        {text : "Shark", correct:false},
        {text : "Blue Whale", correct:true},
        {text : "Elephant", correct:false},
        {text : "Giraffe", correct:false},
       ]
    },
    {
        questions: "Which animal is known as the 'Ship of the Desert?",
       answers : [
        {text : "Camel", correct:true},
        {text : "Elephant", correct:false},
        {text : "Horse", correct:false},
        {text : "Bull", correct:false},
       ]
    },
    {
        questions: "How many days are there in a week?",
       answers : [
        {text : "12", correct:false},
        {text : "30", correct:false},
        {text : "7", correct:true},
        {text : "28", correct:false},
       ]
    },
    {
        questions: "Best Anime Of All Time",
       answers : [
        {text : "Naruto", correct:false},
        {text : "Dragon Ball", correct:false},
        {text : "Bleach", correct:false},
        {text : "One Piece", correct:true},
       ]
    },
    {
        questions: " Name the largest planet of our Solar System?",
       answers : [
        {text : "Sun", correct:false},
        {text : "Mars", correct:false},
        {text : "Jupiter", correct:true},
        {text : "Pluto", correct:false},
       ]
    }
];

let question = document.querySelector('#question');
let answer_btn = document.querySelector('#answer-buttons');
let next_btn = document.getElementById('next-btn');
let score = 0;
let currQuestionIndex = 0;

let start = ()=>{
    currQuestionIndex = 0;
    score = 0;
    next_btn.innerHTML = "Next";
    showQuestion();
};

let showQuestion = ()=>{
    resetState();
    let currentQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    question.innerHTML = questionNo+'.'+currentQuestion.questions;
    currentQuestion.answers.forEach( answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_btn.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    })
    
};
let resetState = ()=>{
    next_btn.style.display = "none";
    while(answer_btn.firstChild)
    {
        answer_btn.removeChild(answer_btn.firstChild)
    }
};

let selectAnswer = (e)=>{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.toggle("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.toggle("incorrect");
    }
    Array.from(answer_btn.children).forEach(button=>{
                if(button.dataset.correct === "true")
                {
                    button.classList.add("correct");
                }
                button.disabled = true;
    });
    next_btn.style.display = "block";
};

let showScore = ()=>{
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block";
}
let handleNextButton = ()=>{
    currQuestionIndex++;
    if(currQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
};
next_btn.addEventListener('click', ()=>{
    if(currQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else
    {
        start();
    }
});
start();