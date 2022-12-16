// Spielcharakter und Gegner
var spieler = document.querySelector(".player");
var playground = document.querySelector(".playground");

//Startposition vom Spieler
spieler.style.left = "320px";
spieler.style.top = "200px";

//Timer für Erscheinen von Hindernissen und Scorecounter
let timer = new Timer(100);
let skitimer = new Timer(200);
const scorecounttimer = new Timer(50);

//Scorecounter
var punkteAnzeige = document.querySelector(".punkte");
let score = 0;

// Grösse der Box
const width = 700;
const height = 576;

function Scorecounter() {
  if (scorecounttimer.ready()) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }
}

function move_player_and_limit_to_playground() {
  console.log(parseInt(spieler.style.right));
  // Check if moving right would put the player outside the playground
  if (keyboard(39) && parseInt(spieler.style.left) + 5 < 652) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  // Check if moving left would put the player outside the playground
  if (keyboard(37) && parseInt(spieler.style.left) - 5 > 0) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
}

function baeume_erscheinen() {
  if (timer.ready()) {
    // Image element is created
    var baumbild = document.createElement("img");
    baumbild.setAttribute("src", "/assets/tree.png");
    baumbild.classList.add("baum");

    // Generate a random number between 0 and the width of the box
    var x = Math.random() * width;
    baumbild.style.left = x + "px";

    // Initial height-position of baeume
    baumbild.style.top = "578px";
    baumbild.style.width = "80px";
    baumbild.style.height = "80px";
    //img.style.backgroundColor = white;

    // Add the img element to the playground
    playground.appendChild(baumbild);

    var baeume = document.querySelectorAll(".baum");
    for (var baum of baeume) {
      baum.style.top = parseInt(baum.style.top) - 60 + "px";
      if (parseInt(baum.style.top) < 10) {
        baum.parentNode.removeChild(baum);
      }
    }
  }
}

function skifahrer_erscheinen() {
  if (skitimer.ready()) {
    // Image element is created
    var skiimg = document.createElement("img");
    skiimg.setAttribute("src", "/assets/dark_skier.png");
    skiimg.classList.add("skier");

    // Generate a random number between 0 and the width of the box
    var x = Math.random() * width;
    skiimg.style.left = x + "px";

    // Initial position and size of skiers
    skiimg.style.top = "578px";
    skiimg.style.width = "40px";
    skiimg.style.height = "80px";

    playground.appendChild(skiimg);

    var skiers = document.querySelectorAll(".skier");
    for (var skier of skiers) {
      skier.style.top = parseInt(skier.style.top) - 40 + "px";
      if (parseInt(skier.style.top) < 10) {
        skier.parentNode.removeChild(skier);
      }
    }
  }
}

function game_over_baumkollision() {
  var baeume = document.querySelectorAll(".baum");
  if (anyCollision(spieler, baeume)) {
    alert("Game over! Please reload page.");
    return;
  }
}

function game_over_alert() {
  var skifahrer = document.querySelectorAll(".skifahrer");
  if (anyCollision(spieler, skifahrer)) {
    alert("Game over! Please reload page.");
    return;
  }
}

function loop() {
  move_player_and_limit_to_playground();
  baeume_erscheinen();
  skifahrer_erscheinen();
  game_over_alert();
  game_over_baumkollision();
  Scorecounter();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// TODO
// character can't leave box, but still able to move right
// restart screen
// leaderboard
// music and sfx
