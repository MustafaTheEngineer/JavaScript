const canvas = document.getElementById("canvas");
const brushSize = document.getElementById("brush-size");
const colorEl = document.getElementById("color");
let color = "#000000";

const ctx = canvas.getContext("2d");

let size = 30;
let isPressed = false;
let x = undefined;
let y = undefined;

brushSize.textContent = size;

canvas.addEventListener("mousedown", e => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", e => {
    if (isPressed) {
        let x2 = e.offsetX;
        let y2 = e.offsetY;
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

canvas.addEventListener("mouseleave", () => {
    isPressed = false;
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

document.getElementById("increase").addEventListener("click", () => {
    if (size < 60) {
        ++size;
        brushSize.textContent = size;
    }
});

document.getElementById("decrease").addEventListener("click", () => {
    if (size > 1) {
        --size;
        brushSize.textContent = size;
    }
});

colorEl.addEventListener("change", e => {
    color = e.target.value;
});

document.getElementById("eraserBtn").addEventListener("click", () => {
    colorEl.value = "#FFFFFF";
    color = "#FFFFFF";
});