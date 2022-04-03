var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var keyPressed = [];
var level = 0;

// IDENTIFICADOR DE TECLA PRESIONADA.
$(document).on("keydown", function (event) {
    // console.log(keyPressed.length);
    if (keyPressed.length === 0 && event.key == "a") {
        nextSequence();
        level = 1
        $("#level-title").html("Level " + level);
    } else {
        return
    }
    keyPressed.push(event.key)
});

// ACTIVACION DEL JUEGO Y SONIDO.

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound();
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    // console.log(gamePattern);
};

// SONIDO DESPUES DEL CLICK EN CUALQUIER BOTON

function playSound() {
    $(".btn").on("click", function () {
        var audio = new Audio("sounds/" + this.id + ".mp3");
        audio.play();
    });
}

// ANIMACION

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

// IDENTIFICADOR DEL BOTON CLICKEADO. COMPARACION DE PATRONES DE JUEGO Y DE USUARIO.

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);


    // SUBIDA DE NIVEL
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
        userClickedPattern = [];
        level++;
        setTimeout(() => {
            $("#level-title").html("Level " + level);
            nextSequence();
            console.log("You're on the level " + level)
        }, 1000);
    } else {
        if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
            console.log("bien")
        } else {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over")
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200);
            $("h1").html("Game Over, Press Any Key to Restart")
            startOver();
            // console.log("Te equivocaste!")
            $(".btn").on("click", function () {
                var audio = new Audio("sounds/wrong.mp3");
                audio.play();
            });
        }
    };

});

function startOver () {
    $(document).on("keydown", function() {
        location.reload();
    })
};