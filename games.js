var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);   
    level++;
    $("h1").text("level " + level);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).toggleClass("pressed");
    }, 300);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] && gamePattern.length == userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    else if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        gamePattern = [];
        level = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").toggleClass("game-over");
         setTimeout(function() {
            $("body").toggleClass("game-over");
        }, 200);
        playSound("wrong");
    };
}

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


$(document).on("keypress", function() {
    if (level == 0) {
        nextSequence();
    }
});


