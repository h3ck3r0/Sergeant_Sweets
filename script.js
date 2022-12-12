var spielfeld = document.querySelector(".playground");

var ghosthunter = document.querySelector(".player");

let ghosthunterLook = document.querySelector(".player_look");

var timer = new Timer(100);

var ghost = document.querySelectorAll(".ghost");

ghosthunter.style.left = "200px";
ghosthunter.style.top = "200px";

//map Ende
const endLeft = 60;
const endRight = 590;
const endTop = 150;
const endBottom = 420;

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
    h.style.top = "0px";
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

function loop() {
  tastatursteuerung();

  //kollision();

  //geometrie();

  ballistik();

  //hindernisse();

  //zeit();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
