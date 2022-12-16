// Spielcharakter und Gegner
var spieler = document.querySelector(".player");
var playground = document.querySelector(".playground");

//Startposition vom Spieler
spieler.style.left = "200px";
spieler.style.top = "200px";

//Timer für Erscheinen von Hindernissen und Scorecounter
var timer = new Timer(200);
let skitimer = new Timer(600);
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

function skifahrer_erscheinen() {
  if (skitimer.ready()) {
    var ba = document.createElement("skifahrer");
    ba.classList.add("skifahrer");

    // Generate a random number between 0 and the width of the box
    var x = Math.random() * width;
    ba.style.left = x + "px";

    // Initial height-position of hindernisse
    ba.style.top = "500px";

    playground.appendChild(ba);
  }

  var skifahrer = document.querySelectorAll(".skifahrer");
  for (var skifahrer of skifahrer) {
    skifahrer.style.top = parseInt(skifahrer.style.top) - 1.5 + "px";
    if (parseInt(skifahrer.style.top) < 30) {
      skifahrer.parentNode.removeChild(skifahrer);
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
  pfeiltasten();
  hindernisse_erscheinen();
  skifahrer_erscheinen();
  game_over_alert();
  game_over_baumkollision();
  Scorecounter();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// TODO
// Collision detection
//hindernisse an verschiedener Position
