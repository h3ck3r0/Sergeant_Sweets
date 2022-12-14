let music = new Audio("sound/background_music.mp3");
let candySound = new Audio("sound/sound_candy_collection.mp3");
let damageSound = new Audio("sound/sound_damage.mp3");
music.loop = true;
music.volume = 0.7;

let spielfeld = document.querySelector(".playground");
let ghosthunter = document.querySelector(".player");
let ghosthunterLook = document.querySelector(".player_look");
let ghost = document.querySelectorAll(".ghost");
let scoreText = document.querySelector(".score");

let sweetsTimer = new Timer(300);
let ghostTimer = new Timer(200);

ghosthunter.style.left = "200px";
ghosthunter.style.top = "200px";

let score = 0;
let health = 2;

//map end
const endLeft = 0;
const endRight = 750;
const endTop = 150;
const endBottom = 485;

function handleMovement() {
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

function handleSweets() {
  //collision
  let sweets = document.querySelectorAll(".sweet");
  for (let collision of allCollisions(ghosthunter, sweets)){
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
    sweet.style.left = x + "px";
    sweet.style.top = y + "px";
    sweet.classList.add("sweet");
    spielfeld.appendChild(sweet);
  }
}

function updateDisplayScore() {
  scoreText.innerHTML = "Sweets: " + score;
}

function handleGhosts() {
  let ghosts = document.querySelectorAll(".ghost");

  //spawning
  let x, y;
  if (ghostTimer.ready()) {
    switch (Math.round(Math.random()*2)){

      //spawn on left side
      case 0:
        x = endLeft;
        y = Math.random() * (endBottom - endTop) + endTop;
        break;

      //spawn on right side
      case 1:
        x = endRight;
        y = Math.random() * (endBottom - endTop) + endTop;
        break;

      //spawn at bottom
      case 2:
        x = Math.random() * (endRight - endLeft) + endLeft;
        y = endBottom;
        break;
    }

    let ghost = document.createElement("img");
    if (Math.random() < 1) {
      ghost.src = "img/ghost_left.png";
    } else {
      ghost.src = "img/ghost_right.png";
    }
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
    ghost.classList.add("ghost");
    spielfeld.appendChild(ghost);
  }

  //movement
  let playerX = parseInt(ghosthunter.style.left);
  let playerY = parseInt(ghosthunter.style.top);

  for(let ghost of ghosts){
    let ghostX = parseInt(ghost.style.left);
    let ghostY = parseInt(ghost.style.top);

    //movement on X axis
    if(Math.abs(playerX - ghostX) > 50){
      if(playerX > ghostX)
        ghost.style.left = ghostX + 2 + "px";
      else
        ghost.style.left = ghostX - 2 + "px";
    }

    //movement on Y axis
    if(Math.abs(playerY - ghostY) > 50){
      if(playerY > ghostY)
        ghost.style.top = ghostY + 1 + "px";
      else
        ghost.style.top = ghostY - 1 + "px";
    }
  }

  //collision
  for (let collision of allCollisions(ghosthunter, ghosts)) {
    collision.remove();
    takeDamage();
  }
}

function takeDamage(){
  damageSound.play();
  health--;

  let heart = document.querySelector(".heart"+health);
  heart.src = "img/heart_empty.png";

  if(health <= 0){
    damageSound.addEventListener("ended", function (){
      window.location.href = "gameover.html";
    });
  }
}

function handleShots(){
  let shots = document.querySelectorAll(".shot");
  let ghosts = document.querySelectorAll(".ghost");

  //spawning
  if(mouseClick()/*&& shots.length < 2*/){
    let shot = document.createElement("img");
    shot.src = "img/schuss.png";
    shot.style.left = ghosthunter.style.left;
    shot.style.top = parseInt(ghosthunter.style.top) + 20 + "px";
    shot.classList.add("shot");

    if(ghosthunterLook.src.includes("right")){
      shot.classList.add("right");
      shot.style.left = parseInt(ghosthunter.style.left) + 60 + "px";
    }else{
      shot.classList.add("left");
    }
    spielfeld.appendChild(shot);
  }

  //movement
  for(let shot of shots){
    if(shot.classList.contains("right"))
      shot.style.left = parseInt(shot.style.left) + 15 + "px";
    else
      shot.style.left = parseInt(shot.style.left) - 15 + "px";

    if(parseInt(shot.style.left) < endLeft || parseInt(shot.style.left) > endRight)
      shot.remove();
  }

  //collision
  for(let shot of shots){
    for (let collision of allCollisions(shot, ghosts)) {
      collision.remove();
    }
  }
}

function loop() {

  handleMovement();
  handleGhosts();
  handleShots();
  handleSweets();
  updateDisplayScore();

  music.play();
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
