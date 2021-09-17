var questionText = document.getElementById("question");
var buttons = document.querySelectorAll("button");

function Question(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

Question.prototype.isCorrect = function (check) {
    return check === this.answer;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.index = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.index];
}

Quiz.prototype.finish = function () {
    return this.index === this.questions.length;
}

Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();
    if (question.isCorrect(answer))
        ++this.score;

    ++this.index;
    console.log(this.index);
}

Quiz.prototype.load = function () {
    questionText.innerText = this.questions[this.index].text; 
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].innerText = this.questions[this.index].options[i];
    }
}

Quiz.prototype.showScore =  function(){
    var bodyChildren = document.getElementById("body");
    var addP = document.createElement("p");
    addP.innerText = this.score;
    bodyChildren.children[1].remove();
    bodyChildren.children[1].remove(); 
    bodyChildren.children[0].innerHTML = "Naber";
    bodyChildren.appendChild(addP);
    bodyChildren.style.fontSize = "30px";
    console.log(bodyChildren.children);
}



var q1 = new Question("What is the best programming language?", ["JavaScript", "C", "C++", "Python", "Java"], "JavaScript");
var q2 = new Question("What is the most popular programming language?", ["Java", "C++", "C", "Python", "JavaScript"], "JavaScript");
var q3 = new Question("What is the language?", ["Java", "C++", "C", "Python", "JavaScript"], "JavaScript");

var questions = [q1, q2,q3];

var quiz = new Quiz(questions);

quiz.load();

buttons.forEach(function (item) {
    item.addEventListener("click", function () {
        quiz.guess(item.innerText);
        if (!quiz.finish())
            quiz.load(); 
        else
            quiz.showScore(); 
    });
});

quiz.load();
