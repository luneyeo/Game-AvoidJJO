//// 캔버스 세팅!
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext('2d')
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);

//// 이미지 로드!
let backgroundImage, chimImage, enemyImage, gameoverImage;

//// 침착맨 좌표!
// chim Image 64*90
let chimX = canvas.width / 2 - 32;
let chimY = canvas.height - 100;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = 'img/background.gif'

  chimImage = new Image();
  chimImage.src = 'img/chim.png'

  enemyImage = new Image();
  enemyImage.src = 'img/enemy.png'

  gameoverImage = new Image();
  gameoverImage.src = 'img/gameover.jpg'
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
}

//// UI 그리기!
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(chimImage, chimX, chimY)
}

//// gif를 계속해서 호출하기!
function main() {
  update() // 좌표값 업데이트
  render() // 배경 이미지
  requestAnimationFrame(main)
}

//// 호출
loadImage()
setupKeyboardListener()
main()