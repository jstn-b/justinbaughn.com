"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { color: [60, 130, 235], speed: 1.6, radius: 0.7, phase: 0, opacity: 0.7 },      // bright blue
  { color: [140, 80, 230], speed: 1.2, radius: 0.65, phase: 2.1, opacity: 0.65 }, // vivid purple
  { color: [30, 190, 170], speed: 1.4, radius: 0.6, phase: 4.2, opacity: 0.6 },   // bright teal
  { color: [170, 70, 220], speed: 1.8, radius: 0.55, phase: 1.0, opacity: 0.55 }, // violet
  { color: [50, 150, 230], speed: 1.0, radius: 0.6, phase: 3.5, opacity: 0.6 },   // sky blue
  { color: [200, 210, 240], speed: 2.2, radius: 0.25, phase: 0.7, opacity: 0.4 }, // light core
  { color: [100, 130, 200], speed: 0.8, radius: 0.5, phase: 5.0, opacity: 0.5 },  // periwinkle wash
];

export function MorphSpinner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const start = performance.now();

    function render() {
      const t = (performance.now() - start) / 1000;
      ctx!.clearRect(0, 0, size, size);

      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "#0a0a1a";
      ctx!.fillRect(0, 0, size, size);

      ctx!.globalCompositeOperation = "screen";

      for (const blob of BLOBS) {
        const x = size * (0.5 + 0.25 * Math.sin(t * blob.speed + blob.phase));
        const y = size * (0.5 + 0.25 * Math.cos(t * blob.speed * 0.8 + blob.phase + 1.0));
        const r = size * blob.radius * (0.9 + 0.1 * Math.sin(t * 1.2 + blob.phase));

        const grad = ctx!.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = blob.color;
        const o = blob.opacity;
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${o})`);
        grad.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, ${o * 0.65})`);
        grad.addColorStop(0.6, `rgba(${cr}, ${cg}, ${cb}, ${o * 0.3})`);
        grad.addColorStop(0.85, `rgba(${cr}, ${cg}, ${cb}, ${o * 0.1})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, size, size);
      }

      // soft-light pass for cohesion
      ctx!.globalCompositeOperation = "soft-light";
      const washGrad = ctx!.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.6);
      washGrad.addColorStop(0, "rgba(140, 160, 230, 0.25)");
      washGrad.addColorStop(0.5, "rgba(100, 80, 180, 0.15)");
      washGrad.addColorStop(1, "rgba(60, 50, 120, 0)");
      ctx!.fillStyle = washGrad;
      ctx!.fillRect(0, 0, size, size);

      // shimmer highlight
      ctx!.globalCompositeOperation = "overlay";
      const shimmerX = size * (0.5 + 0.2 * Math.sin(t * 1.5));
      const shimmerY = size * (0.5 + 0.2 * Math.cos(t * 1.1 + 0.5));
      const shimmerGrad = ctx!.createRadialGradient(shimmerX, shimmerY, 0, shimmerX, shimmerY, size * 0.4);
      shimmerGrad.addColorStop(0, "rgba(230, 235, 255, 0.3)");
      shimmerGrad.addColorStop(0.3, "rgba(180, 195, 240, 0.15)");
      shimmerGrad.addColorStop(0.7, "rgba(150, 165, 220, 0.05)");
      shimmerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx!.fillStyle = shimmerGrad;
      ctx!.fillRect(0, 0, size, size);

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="shrink-0 overflow-hidden"
      style={{
        width: 24,
        height: 24,
        animation: "morphShape 4s ease-in-out infinite",
      }}
    >
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        style={{ width: 24, height: 24, display: "block" }}
      />
    </div>
  );
}
