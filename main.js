// Hero Canvas Water Ripple
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const heroImg = new Image();
heroImg.src = "https://picsum.photos/800/400?random=10";

let ripples = [];

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 0.5;
  }
  update() {
    this.radius += 2;
    this.alpha -= 0.02;
  }
  draw(ctx) {
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.7,
      this.x,
      this.y,
      this.radius
    );
    g.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

canvas.addEventListener("mousemove", (e) => {
  ripples.push(new Ripple(e.offsetX, e.offsetY));
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(heroImg, 0, 0, canvas.width, canvas.height);
  ripples.forEach((r, i) => {
    r.update();
    r.draw(ctx);
    if (r.alpha <= 0) ripples.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
heroImg.onload = () => animate();

// Make images clickable to show extra text
const clickableImages = document.querySelectorAll(".clickable-image");
clickableImages.forEach((img) => {
  img.addEventListener("click", () => {
    const parent = img.closest("section");
    const textDiv = parent.querySelector(".extra-text");
    if (textDiv.textContent) {
      textDiv.textContent = "";
      parent.classList.remove("show-text");
    } else {
      textDiv.textContent = img.dataset.text;
      parent.classList.add("show-text");
    }
  });
});

// Portfolio cards clickable extra text
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const isVisible = card.classList.contains("show-text");
    cards.forEach((c) => c.classList.remove("show-text"));
    if (!isVisible) {
      card.classList.add("show-text");
      card.querySelector(".extra-text").textContent = card.dataset.text;
    }
  });
});
