// Spielcharakter und Gegner
var spieler = document.querySelector(".player");
var gegner1 = document.querySelector(".enemy1");
var playground = document.querySelector(".playground");
//Startposition vom Spieler und der Gegner
spieler.style.left = "200px";
spieler.style.top = "200px";
gegner1.style.top = "200px";
var timer = new Timer(400);

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
    h.style.left = "100px";
    playground.appendChild(h);
  }

  var steine = document.querySelectorAll(".stein");
  for (var stein of steine) {
    stein.style.top = parseInt(stein.style.top) - 1 + "px";
    if (parseInt(stein.style.top) > 400) {
      stein.parentNode.removeChild(stein);
    }
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
  game_over_alert();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// TODO
// Collision detection
//hindernisse an verschiedener Position
