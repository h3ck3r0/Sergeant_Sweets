//Check if the Game is running and add Start Button
//let playing = false;
//let startButton;

// Spielcharakter und Gegner
var spieler = document.querySelector(".player");
var gegner1 = document.querySelector(".enemy1");
var gegner2 = document.querySelector(".enemy2");
var gegner3 = document.querySelector(".enemy3");
var gegner4 = document.querySelector(".enemy4");

//Startposition vom Spieler und der Gegner
spieler.style.left = "200px";
spieler.style.top = "200px";
gegner1.style.top = "200px";
gegner2.style.top = "150px";
gegner3.style.top = "100px";
gegner4.style.top = "50px";

// Sound Effects laden
//var music = new Audio("assets/dream.wav");
//var deathsound = new Audio("sounds/deathsound.wav");

//Timer für Bäume
var timer = new Timer(120);

function bewegung() {
  if (keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  //Bewegung mit linker Pfeiltaste
  if (keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
}

function loop() {
  bewegung();
  //music plays
  //if ((playing = true)) {
  //music.play();
  //}
  //Bewegung mit rechter Pfeiltaste

  //Bäume als Hindernisse
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("tree");
    h.style.top = "800px";
    h.style.left = "100px";
    spielfeld.appendChild(h);
  }
  var trees = document.querySelectorAll(".tree");
  for (var tree of trees) {
    tree.style.top = parseInt(tree.style.top) - 3 + "px";
    if (parseInt(tree.style.top) > 0) {
      tree.parentNode.removeChild(stein);
    }
    // Kollision beendet Spiel
    if (anyCollision(spieler, [trees, opponents])) {
      alert("Game over!");
      return;
    }

    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}
