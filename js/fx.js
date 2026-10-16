/* ==========================================================
   Background pixels: tiny square particles that drift upward
   (like Minecraft's particle effects). Colours come from the active theme.
   Nothing to edit here.
   ========================================================== */
(function () {
  "use strict";
  const canvas = document.getElementById("fx");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, parts = [], colors = ["#fff", "#fff", "#fff"];

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = ["--p1", "--p2", "--p3"].map(function (k) { return cs.getPropertyValue(k).trim() || "#ffffff"; });
  }

  function spawn(anywhere) {
    const sizes = [2, 2, 3, 3, 4, 6];
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 12,
      s: sizes[Math.floor(Math.random() * sizes.length)],
      v: 0.12 + Math.random() * 0.42,          // upward speed
      dx: (Math.random() - 0.5) * 0.18,        // sideways drift
      a: 0.18 + Math.random() * 0.5,           // max opacity
      c: colors[Math.floor(Math.random() * colors.length)],
      ph: Math.random() * 6.28,
      tw: 0.5 + Math.random() * 1.4            // twinkle speed
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(80, Math.max(26, (W * H) / 24000)));
    parts = [];
    for (let i = 0; i < n; i++) parts.push(spawn(true));
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (!reduce) {
        p.y -= p.v;
        p.x += p.dx + Math.sin(t / 1700 * p.tw + p.ph) * 0.12;
        if (p.y < -12 || p.x < -12 || p.x > W + 12) parts[i] = spawn(false);
      }
      const tw = 0.55 + 0.45 * Math.sin(t / 900 * p.tw + p.ph);
      const edge = Math.min(1, Math.max(0, p.y / (H * 0.18)));   // fade out near the top
      ctx.globalAlpha = p.a * tw * edge;
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) { draw(t); requestAnimationFrame(loop); }

  readColors();
  resize();
  let rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
  if (reduce) draw(0); else requestAnimationFrame(loop);
})();
