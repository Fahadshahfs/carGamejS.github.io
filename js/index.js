const score = document.querySelector(".score");
const startScreen = document.querySelector(".startGame");
const gameArea = document.querySelector(".gameplayBoard");
const gameMain = document.querySelector('.game');
const drive = new Audio('assets/cardrive.mp3');
const crash = new Audio('assets/carcrash.mp3');

document.addEventListener("keydown", keyDownfunction);
document.addEventListener("keyup", keyUpfunction);
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let player = { speed: 15, score: 0 };
startScreen.addEventListener("click", start);

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveEnemycar(car);
    moveSideLinesLeft();
    moveSideLinesRight();
    

    if (keys.ArrowUp && player.y > road.top + 120) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 120) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 20) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 60) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);

    player.score++;
    score.innerText = "Score: " + player.score;
  }
}

function start() {
  gameArea.innerHTML = "";
  startScreen.classList.add("hide");
  player.start = true;
  player.score = 0;
  if (typeof drive.loop == 'boolean')
{
    drive.loop = true;
}
else
{
    drive.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
  drive.play();

  window.requestAnimationFrame(gamePlay);

  //loop for road lines

  for (i = 0; i < 7; i++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = i * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  for (i = 0; i < 7; i++) {
    let roadSideLine = document.createElement("div");
    roadSideLine.setAttribute("class", "sidelines");
    roadSideLine.y = i * 150;
    roadSideLine.style.top = roadSideLine.y + "px";
    gameArea.appendChild(roadSideLine);
  }
  for (i = 0; i < 7; i++) {
    let roadSideLineRight = document.createElement("div");
    roadSideLineRight.setAttribute("class", "sidelinesright");
    roadSideLineRight.y = i * 150;
    roadSideLineRight.style.top = roadSideLineRight.y + "px";
    gameArea.appendChild(roadSideLineRight);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  //random bg-color for enemy cars

  function getRandomColor() {
    const availableCharacters = "0123456789ABCDEF";
    const availableCharacterLength = availableCharacters.length;

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color +=
        availableCharacters[
          Math.floor(Math.random() * availableCharacterLength)
        ];
    }

    return color;
  }

  //loop for multiple enemy cars

  for (i = 0; i < 5; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemycar");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = getRandomColor();
    enemyCar.style.left = Math.floor(Math.random() * 400) + "px";
    gameArea.appendChild(enemyCar);
  }

}

//Functions for move car

function keyDownfunction(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function keyUpfunction(e) {
  e.preventDefault();
  keys[e.key] = false;
}


//game over on collide

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

// road lines loop

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 860) {
      item.y -= 910;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveSideLinesLeft() {
  let sideLines = document.querySelectorAll(".sidelines");
  sideLines.forEach(function (item) {
    if (item.y >= 860) {
      item.y -= 910;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveSideLinesRight() {
  let sideLinesRight = document.querySelectorAll(".sidelinesright");
  sideLinesRight.forEach(function (item) {
    if (item.y >= 860) {
      item.y -= 910;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

//gameover screen
function gameOver() {
  
  crash.play();
  player.start = false;
  
  startScreen.classList.remove("hide");
  const scoretext = document.querySelector("#scoretext");
  scoretext.innerText = `Your score is: ${player.score + 1}`;

  const gameovertext = document.querySelector("#gameovertext");
  gameovertext.innerText = "Game Over \n\n Click to play again";
}
function moveEnemycar(car) {
  let enemy = document.querySelectorAll(".enemycar");
  enemy.forEach(function (item) {
    // call collide
    if (isCollide(car, item)) {
      drive.pause()
      
      gameOver();
      console.log(car);
      console.log(item);
    }
    if (item.y >= 860) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 400) + "px";
    }
    item.y += player.speed - 2;
    item.style.top = item.y + "px";
  });
}
