"use client";
import { useEffect, useRef } from "react";

export default function NaviCanvas({ count = 5 }: { count?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        interface Sparkle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;
        }

        interface Navi {
            x: number;
            y: number;
            targetX: number;
            targetY: number;
            moving: boolean;
            waitTime: number;
            sparkles: Sparkle[];
        }

        // Create multiple Navis
        const navis: Navi[] = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            targetX: Math.random() * w,
            targetY: Math.random() * h,
            moving: true,
            waitTime: 0,
            sparkles: [],
        }));

        function newTarget(n: Navi) {
            n.targetX = Math.random() * w;
            n.targetY = Math.random() * h;
            n.moving = true;
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            for (const n of navis) {
                // Smooth movement


                const lerpFactor = 0.02;
                n.x += (n.targetX - n.x) * lerpFactor;
                n.y += (n.targetY - n.y) * lerpFactor;

                const dist = Math.hypot(n.targetX - n.x, n.targetY - n.y);

                if (n.moving) {
                    if (dist < 2) {
                        n.moving = false;
                        n.waitTime = 60 + Math.random() * 40;
                    }

                    // Emit sparkles while flying
                    if (Math.random() < 0.1) {
                        n.sparkles.push({
                            x: n.x + (Math.random() - 0.5) * 8,
                            y: n.y + (Math.random() - 0.5) * 8,
                            vx: (Math.random() - 0.5) * 0.5,
                            vy: 1 + Math.random() * 0.5,
                            life: 40,
                            maxLife: 40,
                        });
                    }
                } else {
                    n.waitTime--;
                    if (n.waitTime <= 0 && Math.random() > 0.2) newTarget(n);

                    // Occasional idle sparkle
                    if (Math.random() < 0.02) {
                        n.sparkles.push({
                            x: n.x + (Math.random() - 0.5) * 8,
                            y: n.y + (Math.random() - 0.5) * 8,
                            vx: (Math.random() - 0.5) * 0.5,
                            vy: 1 + Math.random() * 0.5,
                            life: 50,
                            maxLife: 50,
                        });
                    }
                }

                // Draw sparkles
                for (let i = n.sparkles.length - 1; i >= 0; i--) {
                    const s = n.sparkles[i];
                    s.x += s.vx;
                    s.y += s.vy;
                    s.life--;

                    const alpha = s.life / s.maxLife;
                    const r = 1.5 + Math.random() * 1.5;
                    ctx.fillStyle = `rgba(99, 69, 40, ${alpha * 0.2})`;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                    ctx.fill();

                    if (s.life <= 0 || s.y > h + 10) n.sparkles.splice(i, 1);
                }

                // Draw Navi glow
                const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 30);
                gradient.addColorStop(0, "rgba(99, 69, 40, 0.4)");
                gradient.addColorStop(1, "rgba(173,216,255,0)");
                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(n.x, n.y, 30, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
