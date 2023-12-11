const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
//캔버스 안의 컨텍스트 사용
const dpr = window.devicePixelRatio;
const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();

let canvasWidth, canvasHeight; //초기화

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr); // 너무 확대

  canvas.style.width = canvasWidth + "px"; //다시 맞춰주기
  canvas.style.height = canvasHeight + "px";
}

function render() {
  requestAnimationFrame(render); //화면주사욜마다 적용되기 frame per second
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  then = now - (delta % interval);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
});
