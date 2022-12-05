var spieler = document.querySelector(".player");
var gegner = document.querySelector(".enemy");
var spielfeld = document.querySelector(".playground");

spieler.style.left = "0px";
spieler.style.top = "0px";

gegner.style.left = "100px";
gegner.style.top = "100px";

function tastatursteuerung() {
  if (keyboard(68)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  if (keyboard(65)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
  if (keyboard(83)) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }
  if (keyboard(87)) {
    spieler.style.top = parseInt(spieler.style.top) - 5 + "px";
  }
}

function geometrie() {
  var spielerX = parseInt(spieler.style.left);
  var spielerY = parseInt(spieler.style.top);
  var gegnerX = parseInt(gegner.style.left);
  var gegnerY = parseInt(gegner.style.left);

  var dist = distance(spielerX, spielerY, gegnerX, gegnerY);
  if (dist < 150) {
    spieler.style.backgroundColor = "red";
  } else {
    spieler.style.backgroundColor = "green";
  }

  var a = angle(gegnerX, gegnerY, spielerX, spielerY);
  gegner.style.transform = "rotate(" + a + "deg)";
}

function ballistik() {
  if (mouseClick()) {
    var spielerX = parseInt(spieler.style.left);
    var spielerY = parseInt(spieler.style.top);
    var a = angle(
      spielerX,
      spielerY,
      mousePositionX(spielfeld),
      mousePositionY(spielfeld)
    );

    var schuss = document.createElement("div");
    schuss.classList.add("shot");
    schuss.style.left = spieler.style.left;
    schuss.style.top = spieler.style.top;
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

function loop() {
  tastatursteuerung();

  //geometrie();

  ballistik();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
