// ✅ FIX: login() hides loginPage, shows page1 (now siblings in HTML)
function login() {
  let name = document.getElementById("name").value.toLowerCase().trim();
  let roll = document.getElementById("roll").value.trim();
  let err  = document.getElementById("errorMsg");

  if (name === "lunevi" && roll === "519") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("page1").style.display = "block";
    startFireworks();
    startTyping();
    startHearts();

  } else {
    err.style.display = "block"; // ✅ inline error, no alert()
  }
}

// Enter key support
document.addEventListener("keypress", function(e) {
  if (e.key === "Enter") login();
});

function nextPage() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

// ✅ FIX: i and text are local — resets cleanly every time
function startTyping() {
  const text = "Today is all about your beauty, kindness, and amazing soul 💜✨";
  let i = 0;
  const el = document.getElementById("typing");
  el.innerHTML = "";
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  type();
}

function startHearts() {
  setInterval(() => {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 25 + 10) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 200);
}

// ✅ FIX: canvas resizes with window
var canvas = document.getElementById("fireworks");
var ctx    = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var particles = [];
var animating = false;

function startFireworks() {
  setInterval(() => {
    // ✅ random position, not always center
    let cx = Math.random() * canvas.width;
    let cy = Math.random() * canvas.height * 0.6;
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: cx, y: cy,
        dx: (Math.random() - 0.5) * 8,
        dy: (Math.random() - 0.5) * 8,
        life: 80,
        color: `hsl(${Math.random()*360},100%,60%)`
      });
    }
  }, 800);

  if (!animating) {
    animating = true;
    animate();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ✅ loop backwards to safely splice
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 3, 3);
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  }
}