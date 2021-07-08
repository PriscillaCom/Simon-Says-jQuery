var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var hasStarted = 0;
var level = 0;

$(document).keypress(function(){
  if(hasStarted === 0){
    $("h1").text("Level "+ level);
    hasStarted++;
  }
  else
    nextSequence();
})


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  level++;
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  $("h1").text("Level "+ level);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}
