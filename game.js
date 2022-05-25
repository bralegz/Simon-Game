let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let keyPressed = [];
let level = 0;

// IDENTIFY CLICK ON START BUTTON.
$(document).on("click", function (event) {
    console.log(event.target.id);
    // console.log(keyPressed.length);
    if (keyPressed.length === 0 && event.type == "click" && event.target.id === "start") {
        $("#start").addClass("hidden");
        nextSequence();
        level = 1
        $("#level-title").html("Level " + level);
    } else {
        return
    }
    keyPressed.push(event.type)
});

// GAME START AND SOUND.

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound();
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    // console.log(gamePattern);
};

// SOUND AFTER CLICK ON ANY BUTTON

function playSound() {
    $(".btn").on("click", function () {
        if($("#start").hasClass("hidden")) {
            let audio = new Audio("sounds/" + this.id + ".mp3");
            audio.play();
        }
    });
}

// ANIMATION

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

// IDENTIFY THE CLICKED BUTTON. COMPARE GAME PATTERN AND USER PATTERN.

$(".btn").on("click", function () {
    let userChosenColour = this.id;
    animatePress(userChosenColour);

    if ($("#start").hasClass("hidden")) {
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);


        // LEVEL UP
        if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
            userClickedPattern = [];
            level++;
            setTimeout(() => {
                if ($("#restart").hasClass("hidden")) {
                    $("#level-title").html("Level " + level);
                    nextSequence();
                    // console.log("You're on the level " + level)
                }
            }, 1000);
        } else {
            if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
                console.log("bien")
            } else {
                if ($("#start").hasClass("hidden")) {
                    let audio = new Audio("sounds/wrong.mp3");
                    audio.play();
                    $("#restart").removeClass("hidden");
                    $("#start").addClass("hidden");
                    $("body").addClass("game-over")
                    setTimeout(() => {
                        $("body").removeClass("game-over")
                    }, 200);
                    $("#level-title").html("Game Over")
                    $("#restart").on("click", function () {
                        let audio = new Audio("sounds/wrong.mp3");
                        audio.play();
                        startOver();
                    });
                }

            }
        };
    }

});

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    keyPressed = [];
    level = 0;
    $("#level-title").html("Simon Game");
    $("#restart").addClass("hidden");
    $("#start").removeClass("hidden");

};