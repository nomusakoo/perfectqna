(function () {
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const attributionEl = document.getElementById("attribution");
  const dateLabelEl = document.getElementById("dateLabel");
  const instructionEl = document.getElementById("instruction");
  const canvasWrap = document.getElementById("canvasWrap");
  const canvas = document.getElementById("inkCanvas");
  const fallbackBtn = document.getElementById("fallbackBtn");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const ctx = canvas.getContext("2d");

  const REVEAL_THRESHOLD = 0.55; // 이 비율 이상 지워지면 나머지를 자동으로 완전히 드러냄
  const SAMPLE_W = 48;
  const SAMPLE_H = 24;
  const sampleCanvas = document.createElement("canvas");
  sampleCanvas.width = SAMPLE_W;
  sampleCanvas.height = SAMPLE_H;
  const sampleCtx = sampleCanvas.getContext("2d");

  let currentIndex = 0;
  let revealed = false;
  let drawing = false;
  let lastPoint = null;
  let checkQueued = false;

  function getDailyIndex(len) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / 86400000);
    return dayOfYear % len;
  }

  function formatDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  }

  function sizeCanvas() {
    const rect = canvasWrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function inkColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--ink-canvas")
      .trim() || "#201c18";
  }

  function paintInk() {
    const rect = canvasWrap.getBoundingClientRect();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = inkColor();
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 먹을 갈아낸 듯한 미세한 질감
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const r = 4 + Math.random() * 22;
      ctx.beginPath();
      ctx.fillStyle = Math.random() > 0.5 ? "#000000" : "#ffffff";
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function resetCanvas() {
    sizeCanvas();
    paintInk();
    canvas.style.opacity = "1";
    canvas.style.pointerEvents = "auto";
    revealed = false;
    attributionEl.classList.remove("visible");
    instructionEl.style.opacity = "1";
  }

  function loadQuote(index) {
    currentIndex = index;
    const q = QUOTES[index];
    questionEl.textContent = q.question;
    answerEl.textContent = q.answer;
    attributionEl.textContent = `— ${q.philosopher}, ${q.source}`;
    resetCanvas();
  }

  function brushAt(x, y) {
    const radius = 26;
    ctx.globalCompositeOperation = "destination-out";
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(0.7, "rgba(0,0,0,0.9)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function strokeTo(x, y) {
    if (lastPoint) {
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 8));
      for (let i = 0; i <= steps; i++) {
        const px = lastPoint.x + (dx * i) / steps;
        const py = lastPoint.y + (dy * i) / steps;
        brushAt(px, py);
      }
    } else {
      brushAt(x, y);
    }
    lastPoint = { x, y };
  }

  function queueClearedCheck() {
    if (checkQueued || revealed) return;
    checkQueued = true;
    requestAnimationFrame(() => {
      checkQueued = false;
      checkCleared();
    });
  }

  function checkCleared() {
    const rect = canvasWrap.getBoundingClientRect();
    sampleCtx.clearRect(0, 0, SAMPLE_W, SAMPLE_H);
    sampleCtx.drawImage(canvas, 0, 0, rect.width, rect.height, 0, 0, SAMPLE_W, SAMPLE_H);
    const data = sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
    let transparent = 0;
    const total = SAMPLE_W * SAMPLE_H;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 40) transparent++;
    }
    if (transparent / total >= REVEAL_THRESHOLD) {
      completeReveal();
    }
  }

  function completeReveal() {
    if (revealed) return;
    revealed = true;
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    instructionEl.style.opacity = "0";
    setTimeout(() => attributionEl.classList.add("visible"), 300);
  }

  function pointFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function handleStart(e) {
    if (revealed) return;
    drawing = true;
    lastPoint = null;
    const p = pointFromEvent(e);
    strokeTo(p.x, p.y);
    queueClearedCheck();
    e.preventDefault();
  }

  function handleMove(e) {
    if (!drawing || revealed) return;
    const p = pointFromEvent(e);
    strokeTo(p.x, p.y);
    queueClearedCheck();
    e.preventDefault();
  }

  function handleEnd() {
    drawing = false;
    lastPoint = null;
  }

  canvas.addEventListener("mousedown", handleStart);
  canvas.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", handleEnd);
  canvas.addEventListener("touchstart", handleStart, { passive: false });
  canvas.addEventListener("touchmove", handleMove, { passive: false });
  canvas.addEventListener("touchend", handleEnd);

  fallbackBtn.addEventListener("click", completeReveal);

  shuffleBtn.addEventListener("click", () => {
    let next = currentIndex;
    if (QUOTES.length > 1) {
      while (next === currentIndex) {
        next = Math.floor(Math.random() * QUOTES.length);
      }
    }
    loadQuote(next);
  });

  window.addEventListener("resize", () => {
    if (!revealed) resetCanvas();
  });

  dateLabelEl.textContent = formatDate();
  loadQuote(getDailyIndex(QUOTES.length));
})();
