/* Picks up quiz data from JSON
Generates random quiz rounds */

class QuizQuestions {

    constructor() {
        this.questions = [];
    }

    randomInt(min, max) {
        // Return a random int between min max
        const num = Math.random()*(max-min) + min
        return Math.floor(num)
    }

    newRound() {        
        // Load a random set of questions from json
        fetch("assets/quiz_questions.json").then(response=>response.json())        
        .then(json => {
            // Pick 10 random questions from the data
            for (let i = 0; i < 5; i++) {                
                this.questions.push(json['questions'][this.randomInt(1,10)]);
            }            
        })
        .then(()=>{
            // Add the first question to the ui
            alert("New round");
            this.nextQuestion();
        })
        .catch((e) =>{
            console.log(`** Failed to get question data & set first question: ${e} **`);        
        })
    }    
    
    nextQuestion() {
        // Check there are questions left in this round & restart if required
        if (this.questions.length == 0) {
            alert("End of round");            
            return this.newRound();
        }
        // Populate question and answer elements in the DOM, putting answers in random positions
        let qanda = this.questions.pop()
        let randomPosition = [1,2,3,4].sort(() => Math.random() - 0.5);
        
        // Remove correct answer class from previous question
        if (document.getElementsByClassName("correct_answer").length > 0) {
            document.getElementsByClassName("correct_answer")[0].classList.remove("correct_answer");                       
        }

        document.getElementById("question").innerText = qanda['question'];
        let correctPos = randomPosition.pop();
        document.getElementById(`answer${correctPos}`).innerText = qanda['correct_answer'];
        document.getElementById(`answer${correctPos}`).classList.add("correct_answer");
        document.getElementById(`answer${randomPosition.pop()}`).innerText = qanda['incorrect_answers'][0];
        document.getElementById(`answer${randomPosition.pop()}`).innerText = qanda['incorrect_answers'][1];
        document.getElementById(`answer${randomPosition.pop()}`).innerText = qanda['incorrect_answers'][2];
    }
}

// Init quiz
quiz = new QuizQuestions();