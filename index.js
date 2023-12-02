const canvas = document.querySelector("canvas");
// console.log(canvas); canvas 담긴 것 확인

const ctx = canvas.getContext("2d");
// 2d사용을 ctx에 넣기
// console.log(ctx); 여러 메서드가 사용가능 한 것을 확인
const dpr = window.devicePixelRatio;
// console.log(window.devicePixelRatio); 1.25

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
//css에서도 바꿀 수 있지만 직접 바꿔보기
//화면에 표시될 때 적용
canvas.width = canvasHeight * dpr;
canvas.height = canvasWidth * dpr;
//실제 픽셀 크기 설정, 내부적인 그리기 공간
//fillRect가 직사각형에서 정사각형으로 보여짐
//100으로 수정하면 더 커짐 - 같은 숫자가 좋기 때문에 변수 설정이 유리함
ctx.scale(dpr, dpr);
// 곱하면 2이상인 곳에서는 더 선명해짐

ctx.fillRect(10, 10, 50, 50);
// x,y,가로길이,세로길이
