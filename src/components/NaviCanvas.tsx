'use client';
import { useEffect, useRef } from 'react';

type Sparkle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	maxLife: number;
};

type Navi = {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	moving: boolean;
	waitTime: number;
	sparkles: Sparkle[];
};

const LERP = 0.02;
const GLOW_RADIUS = 30;

function spawnSparkle(n: Navi, life: number): Sparkle {
	return {
		x: n.x + (Math.random() - 0.5) * 8,
		y: n.y + (Math.random() - 0.5) * 8,
		vx: (Math.random() - 0.5) * 0.5,
		vy: 1 + Math.random() * 0.5,
		life,
		maxLife: life,
	};
}

export default function NaviCanvas({ count = 5 }: { count?: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let w = 0;
		let h = 0;

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();

		const randomPoint = () => ({ x: Math.random() * w, y: Math.random() * h });

		const navis: Navi[] = Array.from({ length: count }, () => {
			const start = randomPoint();
			const target = randomPoint();
			return {
				x: start.x,
				y: start.y,
				targetX: target.x,
				targetY: target.y,
				moving: true,
				waitTime: 0,
				sparkles: [],
			};
		});

		const drawGlow = (n: Navi) => {
			const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, GLOW_RADIUS);
			gradient.addColorStop(0, 'rgba(99, 69, 40, 0.4)');
			gradient.addColorStop(1, 'rgba(99, 69, 40, 0)');
			ctx.beginPath();
			ctx.fillStyle = gradient;
			ctx.arc(n.x, n.y, GLOW_RADIUS, 0, Math.PI * 2);
			ctx.fill();
		};

		const step = (n: Navi) => {
			n.x += (n.targetX - n.x) * LERP;
			n.y += (n.targetY - n.y) * LERP;

			if (n.moving) {
				if (Math.hypot(n.targetX - n.x, n.targetY - n.y) < 2) {
					n.moving = false;
					n.waitTime = 60 + Math.random() * 40;
				}
				if (Math.random() < 0.1) n.sparkles.push(spawnSparkle(n, 40));
			} else {
				n.waitTime--;
				if (n.waitTime <= 0 && Math.random() > 0.2) {
					const target = randomPoint();
					n.targetX = target.x;
					n.targetY = target.y;
					n.moving = true;
				}
				if (Math.random() < 0.02) n.sparkles.push(spawnSparkle(n, 50));
			}

			n.sparkles = n.sparkles.filter((s) => {
				s.x += s.vx;
				s.y += s.vy;
				s.life--;
				ctx.fillStyle = `rgba(99, 69, 40, ${(s.life / s.maxLife) * 0.2})`;
				ctx.beginPath();
				ctx.arc(s.x, s.y, 1.5 + Math.random() * 1.5, 0, Math.PI * 2);
				ctx.fill();
				return s.life > 0 && s.y <= h + 10;
			});
		};

		let frame = 0;
		const draw = () => {
			ctx.clearRect(0, 0, w, h);
			for (const n of navis) {
				step(n);
				drawGlow(n);
			}
			frame = requestAnimationFrame(draw);
		};

		const drawStill = () => {
			ctx.clearRect(0, 0, w, h);
			navis.forEach(drawGlow);
		};

		const start = () => {
			cancelAnimationFrame(frame);
			if (reducedMotion.matches || document.hidden) drawStill();
			else draw();
		};

		const onResize = () => {
			resize();
			if (reducedMotion.matches) drawStill();
		};

		window.addEventListener('resize', onResize);
		document.addEventListener('visibilitychange', start);
		reducedMotion.addEventListener('change', start);
		start();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('visibilitychange', start);
			reducedMotion.removeEventListener('change', start);
		};
	}, [count]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className='fixed inset-0 z-0 w-full h-full pointer-events-none'
		/>
	);
}
