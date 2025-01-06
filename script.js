const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let player = { x: 200, y: 550, size: 30 };
let balls = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBalls() {
  balls.forEach((ball) => {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateBalls() {
  balls.forEach((ball, index) => {
    ball.y += 5;
    if (ball.y > canvas.height) balls.splice(index, 1);
    if (
      ball.x > player.x &&
      ball.x < player.x + player.size &&
      ball.y > player.y &&
      ball.y < player.y + player.size
    ) {
      balls.splice(index, 1);
      score++;
    }
  });
}

function addBall() {
  let x = Math.random() * canvas.width;
  balls.push({ x, y: 0 });
}

setInterval(addBall, 1000);

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBalls();
  updateBalls();
  drawScore();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && player.x > 0) player.x -= 20;
  if (e.key === 'ArrowRight' && player.x < canvas.width - player.size)
    player.x += 20;
});

update();
