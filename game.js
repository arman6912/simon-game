// array of the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// creating empty array to save game pattern
var gamePattern = [];
var userClickedPattern = [];

var started = false; // to keep track if the game started
var level = 0; // level

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        console.log("wrong");

        var wrong = new Audio("sounds/wrong.mp3"); //playing the wrong sound
        wrong.play();

        $("body").addClass("game-over"); // red flash effect
        setTimeout(function(){
          $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

// function to continue the sequence
function nextSequence(){

  userClickedPattern = []; // resetting the pattern
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // retrieving the same id as the random chosen color
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // playing the audio of the respective button
  playSound(randomChosenColour);
}






//functions

function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];

}
