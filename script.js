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
  const sealEl = document.getElementById("seal");
  const shareRow = document.getElementById("shareRow");
  const shareKakaoBtn = document.getElementById("shareKakao");
  const shareFacebookBtn = document.getElementById("shareFacebook");
  const shareLinkBtn = document.getElementById("shareLink");
  const shareToast = document.getElementById("shareToast");
  const ctx = canvas.getContext("2d");

  // https://developers.kakao.com 에서 발급받은 JavaScript 키를 넣으면
  // 카카오톡 공유가 정식 공유 카드로 열립니다. 비워두면 웹 공유 시트 /
  // 링크 복사로 대체됩니다.
  const KAKAO_JS_KEY = "";

  const REVEAL_THRESHOLD = 0.35; // 이 비율 이상 지워지면 나머지를 자동으로 완전히 드러냄
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

  let kakaoSdkLoaded = false;

  function loadKakaoSdk() {
    if (!KAKAO_JS_KEY || kakaoSdkLoaded || window.Kakao) return;
    kakaoSdkLoaded = true;
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);
  }

  function pageUrl() {
    return window.location.href.split("#")[0].split("?")[0];
  }

  function shareText() {
    const q = QUOTES[currentIndex];
    return `"${q.question}"\n\n${q.answer}\n— ${q.philosopher}, ${q.source}\n\n하루 한 물음`;
  }

  function showToast(message) {
    shareToast.textContent = message;
    shareToast.classList.add("visible");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => shareToast.classList.remove("visible"), 1800);
  }

  function copyShareLink() {
    const text = shareText() + "\n" + pageUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast("복사했어요"),
        () => showToast("복사에 실패했어요")
      );
    } else {
      showToast("복사에 실패했어요");
    }
  }

  function shareToFacebook() {
    const shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(pageUrl()) +
      "&quote=" +
      encodeURIComponent(shareText());
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  }

  function shareToKakao() {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: "text",
        text: shareText(),
        link: { mobileWebUrl: pageUrl(), webUrl: pageUrl() }
      });
      return;
    }
    if (navigator.share) {
      navigator.share({ title: "하루 한 물음", text: shareText(), url: pageUrl() }).catch(() => {});
      return;
    }
    copyShareLink();
    showToast("링크를 복사했어요. 카카오톡에 붙여넣어 보세요");
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

    // 굵은 붓결 — 한 방향으로 갈린 먹의 결
    const strokeAngle = -0.35;
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const len = rect.width * (0.25 + Math.random() * 0.35);
      const thickness = 10 + Math.random() * 22;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(strokeAngle + (Math.random() - 0.5) * 0.4);
      ctx.globalAlpha = 0.05 + Math.random() * 0.04;
      ctx.fillStyle = Math.random() > 0.5 ? "#000000" : "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, 0, len / 2, thickness / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 미세한 먹 알갱이 결
    ctx.globalAlpha = 0.035;
    for (let i = 0; i < 140; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const r = 0.6 + Math.random() * 2.2;
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
    sealEl.classList.remove("stamped");
    shareRow.classList.remove("visible");
    shareToast.classList.remove("visible");
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
    setTimeout(() => sealEl.classList.add("stamped"), 700);
    setTimeout(() => shareRow.classList.add("visible"), 900);
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

  shareLinkBtn.addEventListener("click", copyShareLink);
  shareFacebookBtn.addEventListener("click", shareToFacebook);
  shareKakaoBtn.addEventListener("click", shareToKakao);

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

  loadKakaoSdk();
  dateLabelEl.textContent = formatDate();
  loadQuote(getDailyIndex(QUOTES.length));
})();
