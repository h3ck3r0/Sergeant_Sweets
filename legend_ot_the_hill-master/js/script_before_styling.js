// Spielcharakter und Gegner
var spieler = document.querySelector(".player");
var playground = document.querySelector(".playground");

//Startposition vom Spieler
spieler.style.left = "200px";
spieler.style.top = "200px";

//Timer für Erscheinen von Hindernissen und Scorecounter
var timer = new Timer(200);
let baumtimer = new Timer(600);
const scorecounttimer = new Timer(50);

//Scorecounter
var punkteAnzeige = document.querySelector(".punkte");
let score = 0;

// Grösse der Box
const width = 500;
const height = 500;

function Scorecounter() {
  if (scorecounttimer.ready()) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }
}

function pfeiltasten() {
  if (keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  if (keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
}

function hindernisse_erscheinen() {
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("stein");

    // Generate a random number between 0 and the width of the box
    var x = Math.random() * width;
    h.style.left = x + "px";

    // Initial height-position of hindernisse
    h.style.top = "400px";

    playground.appendChild(h);

    var steine = document.querySelectorAll(".stein");
    for (var stein of steine) {
      stein.style.top = parseInt(stein.style.top) - 80 + "px";
      if (parseInt(stein.style.top) < 30) {
        stein.parentNode.removeChild(stein);
      }
    }
  }
}

function baeume_erscheinen() {
  if (baumtimer.ready()) {
    var ba = document.createElement("div");
    ba.classList.add("baum");

    // Generate a random number between 0 and the width of the box
    var x = Math.random() * width;
    ba.style.left = x + "px";

    // Initial height-position of hindernisse
    ba.style.top = "500px";

    playground.appendChild(ba);
  }

  var baeume = document.querySelectorAll(".baum");
  for (var baum of baeume) {
    baum.style.top = parseInt(baum.style.top) - 1.5 + "px";
    if (parseInt(baum.style.top) < 30) {
      baum.parentNode.removeChild(baum);
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
  var steine = document.querySelectorAll(".stein");
  if (anyCollision(spieler, steine)) {
    alert("Game over! Please reload page.");
    return;
  }
}

function loop() {
  pfeiltasten();
  hindernisse_erscheinen();
  baeume_erscheinen();
  game_over_alert();
  game_over_baumkollision();
  Scorecounter();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// TODO
// Collision detection
//hindernisse an verschiedener Position
