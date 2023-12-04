const canvas = document.querySelector("canvas");
// console.log(canvas); canvas 담긴 것 확인

const ctx = canvas.getContext("2d");
// 2d사용을 ctx에 넣기
// console.log(ctx); 여러 메서드가 사용가능 한 것을 확인
const dpr = window.devicePixelRatio;
// console.log(window.devicePixelRatio); 1.25

const canvasWidth = innerWidth; //전체화면으로 바꾸기
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
//css에서도 바꿀 수 있지만 직접 바꿔보기
//화면에 표시될 때 적용
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
//실제 픽셀 크기 설정, 내부적인 그리기 공간
//fillRect가 직사각형에서 정사각형으로 보여짐
//100으로 수정하면 더 커짐 - 같은 숫자가 좋기 때문에 변수 설정이 유리함
ctx.scale(dpr, dpr);
// 곱하면 2이상인 곳에서는 더 선명해짐

// ctx.fillRect(10, 10, 50, 50); 네모를 그리는 방법
// x,y,가로길이,세로길이

// ctx.beginPath();
// //Path를 그리겠다는 것을 알려줌
// //중심에서 반지름만큼 떨어져 홀을 그리는 메서드

// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
// //시작하는 x,y , 반지름 길이, 시작하는 각도, 끝나는 각도, 시계방향일지 반시계 방향일지
// //디그리가 아닌 라디안을 사용하기 때문 - Math.PI/180이 1도가 됨
// //90으로 하면 3시-6시까지만 그려지게 됨
// ctx.fillStyle = "red";
// ctx.fill(); //색 채우기
// // ctx.stroke(); //색이 채우지지 않고 그려지게 됨
// ctx.closePath(); //그려지게 됨

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03; //1이하의 값은 0으로 수렴-마찰
  }
  update() {
    // this.y += 1;
    this.vy *= this.acc; //가속도 적용
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}

// const x = 100;
// const y = 100;
// const radius = 50;
// const particle = new Particle(x, y, radius); //새 인스턴스 만들기
const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5); //속도 랜덤으로
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

console.log(particles);

let interval = 1000 / 60; //60fps를 타겟으로 함
let now, delta;
let then = Date.now(); // 초기화 시켜줌

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return; // 배경을 지우게 될 것

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //프레임마다 지우고 새롭게 draw
  //x를 1px 이동시키기
  // particle.y += 1;
  // particle.draw();
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth); //x값 다시 설정
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5); //속도 랜덤으로
    }
  });
  then = now - (delta % interval);
}

animate();
// 주사율이 다르면 모니터마다 다르게 나올 수 있다.
//FPS = frame per second, 초당 프레임횟수, 1초에 리퀘스트 애니메이션 프레임을 몇번을 실행을 시킬까
