import { useEffect, useRef } from "react";

export function BgCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let W, H, raf;
    function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * 1.4 - 0.2, y: Math.random() * 1.4 - 0.2,
      r: 0.25 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.00012, vy: (Math.random() - 0.5) * 0.0001,
      hue: [340, 200, 50, 170, 280, 30][i], sat: 35 + Math.random() * 20,
      lit: 62 + Math.random() * 12, alpha: 0.05 + Math.random() * 0.04,
    }));
    const dust = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025, vy: -0.0001 - Math.random() * 0.00015,
      r: 0.4 + Math.random() * 0.9, alpha: 0.12 + Math.random() * 0.25,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#1e1e1e"; ctx.fillRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -0.3) o.vx = Math.abs(o.vx); if (o.x > 1.3) o.vx = -Math.abs(o.vx);
        if (o.y < -0.3) o.vy = Math.abs(o.vy); if (o.y > 1.3) o.vy = -Math.abs(o.vy);
        const px = o.x * W, py = o.y * H, pr = o.r * Math.min(W, H);
        const g = ctx.createRadialGradient(px, py, 0, px, py, pr);
        g.addColorStop(0, `hsla(${o.hue},${o.sat}%,${o.lit}%,${o.alpha})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
      });
      dust.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -0.01) d.y = 1.01; if (d.x < -0.01) d.x = 1.01; if (d.x > 1.01) d.x = -0.01;
        ctx.beginPath(); ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,198,208,${d.alpha * 0.45})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />;
}
