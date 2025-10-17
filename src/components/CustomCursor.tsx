"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("img");
    cursor.src = "/cursor.ani"; // ✅ Local static file
    Object.assign(cursor.style, {
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "32px",
      height: "32px",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate3d(-50%, -50%, 0)",
      willChange: "transform",
    });
    document.body.appendChild(cursor);

    let mouseX = 0,
      mouseY = 0,
      currentX = 0,
      currentY = 0;
    let raf: number;

    const animate = () => {
      // 🪶 Smooth easing
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);
    document.body.style.cursor = "none";
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      cursor.remove();
      document.body.style.cursor = "auto";
    };
  }, []);

  return null;
}
