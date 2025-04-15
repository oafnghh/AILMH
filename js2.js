const video = document.getElementById("video");
const captureBtn = document.getElementById("capture");
const finalCanvas = document.getElementById("finalCanvas");
const ctx = finalCanvas.getContext("2d");
const filterSelect = document.getElementById("filter");
const downloadBtn = document.getElementById("download");
const refreshBtn = document.getElementById("refresh");
const countdownEl = document.getElementById("countdown");

let capturedImages = [];
let filter = "none";

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
    video.srcObject = stream;
    });

filterSelect.addEventListener("change", () => {
    filter = filterSelect.value;
    video.style.filter = filter;
});

captureBtn.addEventListener("click", async () => {
    if (capturedImages.length >= 4) {
    alert("Bạn đã chụp đủ 4 ảnh! 🥳");
    return;
    }

    let count = 3;
    countdownEl.style.display = "block";
    countdownEl.textContent = count;

    const countdownInterval = setInterval(() => {
    count--;
    if (count === 0) {
        clearInterval(countdownInterval);
        countdownEl.style.display = "none";
        takePhoto();
    } else {
        countdownEl.textContent = count;
    }
    }, 1000);
});

function takePhoto() {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 300;
    tempCanvas.height = 400;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.filter = filter;
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    const image = new Image();
    image.src = tempCanvas.toDataURL("image/png");

    image.onload = () => {
    capturedImages.push(image);
    renderFinalCanvas();
    };
}

function renderFinalCanvas() {
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    for (let i = 0; i < capturedImages.length; i++) {
    const x = i * 305;
    ctx.drawImage(capturedImages[i], x, 0, 300, 400);

    if (i < capturedImages.length - 1) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(x + 300, 0);
        ctx.lineTo(x + 300, 400);
        ctx.stroke();
    }
    }
}

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "life4cut.png";
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
});

refreshBtn.addEventListener("click", () => {
    capturedImages = [];
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
});