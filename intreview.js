function* interview() {
    var answer;
    console.log("I am going to ask question #1");
    answer = yield "What's your name?";
    console.log("Name:", answer);
    console.log("I am going to ask question #2");
    answer = yield "How old are you?";
    console.log("Age:", answer);
    console.log("I am going to ask question #3");
    answer = yield "Do you like to Node?";
    console.log("Answer:", answer);

    if (-1 === ["yes", "sure", "absolutely", "of-course", "of course", "very much"].indexOf(answer.toLowerCase())) {
        return "YOU FAILED! NO NODE FOR YOU, COME BACK ONE YEAR!";
    }

    return "CONGRATS! YOU PASSED!";
}

var interviewer = interview();
console.log("I am starting the interview!");
var result = interviewer.next();
console.log("Question 1:", result.value, "| done?", result.done);
result = interviewer.next("Itai");
console.log("Question 2:", result.value, "| done?", result.done);
var result = interviewer.next(39);
console.log("Question 3:", result.value, "| done?", result.done);
var result = interviewer.next("Very Much");
console.log("Final note:", result.value, "| done?", result.done);