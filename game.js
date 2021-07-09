var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var hasStarted = 0;
var level = 0;

$(document).keypress(function(){
  if(hasStarted === 0){
    startOver();
    $("h1").text("Level "+ level);
    nextSequence();
  }
})


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  if(comparePattern(level)) {
    level++;
    $("h1").text("Level "+ level);
    setTimeout(nextSequence,1000);

    // userClickedPattern = [];
  }
  else {
    setTimeout(
      function(){ $("body").removeClass("game-over") },400);
  }
});

function comparePattern(currentLevel) {
  console.log("level: " + currentLevel);
  console.log("gamePattern: " + gamePattern[currentLevel]);
  console.log("userClickedPattern: " + userClickedPattern[currentLevel]);
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log('same');
    return true;
  }
  else {
    playErrorSound();
    gameOver();
    return false;
  }
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function playErrorSound(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function gameOver(){
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  hasStarted = 0;
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  hasStarted++;
}
