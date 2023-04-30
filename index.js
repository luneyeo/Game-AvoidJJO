//// 캔버스 세팅!
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext('2d')
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);

//// 이미지 로드!
let backgroundImage, chimImage, enemyImage, gameOverImage;
let gameOver = false // true이면 게임이 끝, false면 게임 유지
let score = 0

//// 침착맨 좌표!
//// chim Image 64*90
let chimX = canvas.width / 2 - 32;
let chimY = canvas.height - 100;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = 'img/background.gif'

  chimImage = new Image();
  chimImage.src = 'img/chim.png'

  enemyImage = new Image();
  enemyImage.src = 'img/enemy.png'

  gameOverImage = new Image();
  gameOverImage.src = 'img/gameover.png'
}

//// 방향키 세팅!
// 클릭버튼 값 저장
let keysDown = {}

function setupKeyboardListener() {
  document.addEventListener('keydown', function(e){
    keysDown[e.key] = true
  })
  document.addEventListener('keyup', function(e){
    delete keysDown[e.key]
  })
}

//// 업데이트!
function update() {
  if('ArrowRight' in keysDown) {
    chimX += 7 // 침착맨 속도
  } // right
  if('ArrowLeft' in keysDown) {
    chimX -= 7
  } // left

  // 침착맨 x값 최소, 최대
  if(chimX <= 0){
    chimX = 0
  }
  if(chimX >= canvas.width - 64) {
    chimX = canvas.width - 64
  }

  // 적군 y값 업데이트
  for(let i = 0; i < enemyList.length; i++){
    enemyList[i].update()
  }
}

//// (적군) 랜덤!
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum
}

//// 적군!
let enemyList = []
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function() {
    this.y = 0
    this.x = generateRandomValue(0 , canvas.width - 64)
    enemyList.push(this)
    avoidEnemy()
    meetEnemy()
  }
  this.update = function() {
    this.y += 3 // 적군 떨어지는 속도 조절
  }

}

// 적군 생성
function createEnemy() {
  const interval = setInterval(function(){
    let e = new Enemy()
    e.init()
    if(gameOver){ // 게임오버일때 적군 생성 멈추기
      clearInterval(interval)
    }
  } , 800)
}


// 적군을 피하면 스코어 1점 얻기
function avoidEnemy(){
  for(let i = 0; i < enemyList.length; i++) {
    if(enemyList[i].y > canvas.height - 100 ){
      score++
      enemyList.splice(i, 1) // 마지막 배열 값 삭제
      i--;
    }
  }
}

// 적군을 만나면 게임오버
function meetEnemy() {
  for(let i = 0; i < enemyList.length; i++){
    if(enemyList[i].y >= chimY - 68
      && enemyList[i].x <= chimX
      && enemyList[i].x + 64 >= chimX
      ){
      gameOver = true;
      console.log('gameover')
    }
    console.log('chimY', chimY)
    console.log('enemyList[i].y', enemyList[i].y)
  }
}

//// UI 그리기!
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(chimImage, chimX, chimY);
  ctx.fillText(`Score: ${score}`, 20, 30);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';

  for(let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
  }
}

//// gif를 계속해서 호출하기!
function main() {
  if(!gameOver){
    update() // 좌표값 업데이트
    render() // 배경 이미지
    requestAnimationFrame(main)
  } else{
    ctx.drawImage(gameOverImage, 0, 0)
  }
}

//// 호출
loadImage()
setupKeyboardListener()
createEnemy()
main()