"use client";
import { useEffect, useRef } from "react";

export default function FlameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ✅ Resize after mount (no SSR mismatch)
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFlame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += 20) {
        const h = Math.random() * 60 + 40;
        ctx.strokeStyle = `rgba(255, ${120 + Math.random() * 100}, 50, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x, canvas.height - h);
        ctx.stroke();
      }
    };

    const loop = () => {
      drawFlame();
      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1200}  // ✅ Static width for SSR
      height={120}
      className="fixed bottom-0 left-0 w-screen h-[120px] opacity-80 mix-blend-screen pointer-events-none z-50"
    />
  );
}
