let music = new Audio("sound/background_music.mp3");
let candySound = new Audio("sound/sound_candy_collection.wav");
music.loop = true;

var spielfeld = document.querySelector(".playground");
var ghosthunter = document.querySelector(".player");
let ghosthunterLook = document.querySelector(".player_look");
var ghost = document.querySelectorAll(".ghost");
let scoreText = document.querySelector(".score");

var timer = new Timer(100);
let sweetsTimer = new Timer(300);
let ghostTimer = new Timer(200);

let score = 0;

ghosthunter.style.left = "200px";
ghosthunter.style.top = "200px";

//map Ende
const endLeft = 0;
const endRight = 750;
const endTop = 150;
const endBottom = 485;

function tastatursteuerung() {
  // D
  if (keyboard(68) && parseInt(ghosthunter.style.left) < endRight) {
    ghosthunter.style.left = parseInt(ghosthunter.style.left) + 5 + "px";
    ghosthunterLook.src = "img/ghosthunter_right.png";
  }
  // A
  if (keyboard(65) && parseInt(ghosthunter.style.left) > endLeft) {
    ghosthunter.style.left = parseInt(ghosthunter.style.left) - 5 + "px";
    ghosthunterLook.src = "img/ghosthunter_left.jpg";
  }
  // S
  if (keyboard(83) && parseInt(ghosthunter.style.top) < endBottom) {
    ghosthunter.style.top = parseInt(ghosthunter.style.top) + 5 + "px";
  }
  // W
  if (keyboard(87) && parseInt(ghosthunter.style.top) > endTop) {
    ghosthunter.style.top = parseInt(ghosthunter.style.top) - 5 + "px";
  }
}

function kollision() {
  ghost = document.querySelectorAll(".ghost");
  // Kommentar: sobald der ghosthunter mit ghost1 oder 2 kollidiert, ist das Spiel fertig
  if (anyCollision(ghosthunter, ghost)) {
    //alert("Game over!");
    return;
  }

  // Kommentar: sobald der ghosthunter mit ghost3 oder 4 kollidiert, werden diese gelöscht
  var collisions = allCollisions(ghosthunter, ghost);
  // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }
}

function geometrie() {
  if (keyboard(39)) {
    ghosthunter.style.left = parseInt(ghosthunter.style.left) + 5 + "px";
  }
  if (keyboard(37)) {
    ghosthunter.style.left = parseInt(ghosthunter.style.left) - 5 + "px";
  }

  var ghosthunterX = parseInt(ghosthunter.style.left);
  var ghosthunterY = parseInt(ghosthunter.style.top);
  var ghostX = parseInt(ghosthunter.style.left);
  var ghostY = parseInt(ghosthunter.style.left);

  var dist = distance(ghosthunter, ghost);
  if (dist < 150) {
    ghosthunter.style.backgroundColor = "red";
  } else {
    ghosthunter.style.backgroundColor = "green";
  }

  var a = angle(ghost, ghosthunter);
  ghost.style.transform = "rotate(" + a + "deg)";
}

function ballistik() {
  if (mouseClick()) {
    var ghosthunter = document.getElementById("ghosthunter");
    var ghosthunterX = parseInt(ghosthunter.style.left);
    var ghosthunterY = parseInt(ghosthunter.style.top);

    var ghost = document.getElementById("ghost");
    var ghostX = parseInt(ghost.style.left);
    var ghostY = parseInt(ghost.style.top);
    var a = angle(ghosthunterX, ghosthunterY, ghostX, ghostY);

    var schuss = document.createElement("div");
    schuss.classList.add("shot");
    schuss.style.left = ghosthunterX + "px";
    schuss.style.top = ghosthunterY + "px";
    schuss.setAttribute("data-angle", ((180 - a) * Math.PI) / 180);
    spielfeld.appendChild(schuss);

    var schuesse = document.querySelectorAll(".shot");
    for (var schuss of schuesse) {
      var xPos = parseFloat(schuss.style.left);
      var yPos = parseFloat(schuss.style.top);
      var rotation = schuss.getAttribute("data-angle");

      schuss.style.left = 3 * Math.sin(rotation) + xPos + "px";
      schuss.style.top = 3 * Math.cos(rotation) + yPos + "px";

      if (
        parseInt(schuss.style.left) < 0 ||
        parseInt(schuss.style.left) > 400 ||
        parseInt(schuss.style.top) < 0 ||
        parseInt(schuss.style.top) > 400
      ) {
        schuss.parentNode.removeChild(schuss);
      }
    }
  }
}

function createGhost() {
  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("ghost");
    h.style.top = "100px";
    h.style.left = "100px";
    spielfeld.appendChild(h);
  }
}

function disappearGhost() {
  if (timer.ready()) {
    ghosts = document.querySelectorAll(".ghost");
    for (var ghost of ghosts) {
      ghost.parentNode.removeChild(ghost);
    }
  }
}

function moveGhost() {
  let posSplayerTop = ghosthunter.style.top;
  let posSplayerLeft = ghosthunter.style.left;

  if (timer.ready()) {
    ghosts = document.querySelectorAll(".ghost");
    for (var ghost of ghosts) {
      ghost.style.left = 3 * Math.sin(rotation) + xPos + "px";
      ghost.style.top = 3 * Math.cos(rotation) + yPos + "px";
    }
  }
}

function handleSweets() {
  //collision
  let sweets = document.querySelectorAll(".sweet");
  for (let collision of allCollisions(ghosthunter, sweets))
    if (collision.classList.contains("sweet")) {
      collision.remove();
      score++;
      candySound.play();
    }

  //spawning
  if (sweetsTimer.ready()) {
    let x = Math.random() * (endRight - endLeft) + endLeft;
    let y = Math.random() * (endBottom - endTop) + endTop;

    let srcSweets = [
      "img/loli_orange-blue.png",
      "img/loli_pink-green.png",
      "img/candy_yellow.png",
      "img/candy_pink.png",
      "img/candy_cane.png",
    ];

    let sweet = document.createElement("img");
    sweet.src = srcSweets[Math.round(Math.random() * 4)];
    sweet.height = 30;
    sweet.width = 30;
    sweet.style.left = x + "px";
    sweet.style.top = y + "px";
    sweet.classList.add("sweet");
    spielfeld.appendChild(sweet);
  }
}

function updateScore() {
  scoreText.innerHTML = "Sweets: " + score;
}

function handleGhosts() {
  //spawning
  if (ghostTimer.ready()) {
    let x = Math.random() * (endRight - endLeft) + endLeft;
    let y = Math.random() * (endBottom - endTop) + endTop;

    let ghost = document.createElement("img");
    if (Math.random() < 1) {
      ghost.src = "img/ghost_left.png";
    } else {
      ghost.src = "img/ghost_right.png";
    }
    ghost.style.height = "80px";
    ghost.style.width = "80px";
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
    ghost.classList.add("ghost");
    spielfeld.appendChild(ghost);
  }
}

function loop() {
  if (mouseClick()) music.play();

  tastatursteuerung();

  handleGhosts();

  //kollision();

  //geometrie();

  //ballistik();

  //hindernisse();

  //zeit();

  handleSweets();

  updateScore();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
