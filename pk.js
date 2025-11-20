// Camera start
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// Buttons
const captureBtn = document.getElementById("capture-btn");
const retryBtn = document.getElementById("retry-btn");
const blurbBox = document.getElementById("blurb");

// Cyberpunk blurbs
const blurbs = [
  "You look like a Night Runner who cracks neon-coded secrets.",
  "A streetwise cyber-slinger walking between shadows and lights.",
  "A neon renegade with a mind sharper than chrome.",
  "A reactor-powered wanderer glowing with electric confidence.",
  "A cool-headed tech ghost drifting through the neon city."
];

// Capture → Apply cyberpunk effects → Show result
captureBtn.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Flicker transition
  canvas.style.filter = "brightness(7) contrast(300%) hue-rotate(90deg)";
  canvas.style.opacity = "0";
  setTimeout(() => {
    canvas.style.transition = "0.5s";
    canvas.style.opacity = "1";

    // Neon effect
    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = "rgba(255,0,255,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(0,200,255,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Show blurb
    blurbBox.classList.remove("hidden");
    retryBtn.classList.remove("hidden");

    blurbBox.innerText = blurbs[Math.floor(Math.random() * blurbs.length)];

  }, 150);
};

// Try again
retryBtn.onclick = () => {
  blurbBox.classList.add("hidden");
  retryBtn.classList.add("hidden");
  canvas.style.filter = "none";
  canvas.style.opacity = "0";
};
