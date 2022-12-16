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

//Random Number Generator
const x = Math.random() * 500;

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
    h.style.top = "400px";
    h.style.left = "100 +px";
    playground.appendChild(h);
  }

  var steine = document.querySelectorAll(".stein");
  for (var stein of steine) {
    stein.style.top = parseInt(stein.style.top) - 1 + "px";
    if (parseInt(stein.style.top) < 20) {
      stein.parentNode.removeChild(stein);
    }
  }
}

function baeume_erscheinen() {
  if (baumtimer.ready()) {
    var ba = document.createElement("div");
    ba.classList.add("baum");
    ba.style.top = "400px";
    ba.style.left = "300px";
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
