'use client';
import { useEffect, useRef } from 'react';

type Sparkle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	decay: number;
	size: number;
	seed: number;
};

type Fairy = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	tx: number;
	ty: number;
	phase: number;
	speed: number;
	companion: boolean;
	sparkles: Sparkle[];
};

const CORE = '255, 252, 236';
const AURA = '150, 205, 255';
const FOLLOW_MS = 3500;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function Fairies({ count = 3 }: { count?: number }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!canvas || !ctx) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let w = 0;
		let h = 0;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();

		const fairies: Fairy[] = Array.from({ length: count }, (_, i) => ({
			x: rand(0, w),
			y: rand(0, h),
			vx: 0,
			vy: 0,
			tx: rand(0, w),
			ty: rand(0, h),
			phase: rand(0, Math.PI * 2),
			speed: rand(0.5, 0.9),
			companion: i === 0,
			sparkles: [],
		}));

		const pointer = { x: 0, y: 0, at: -Infinity };
		const onPointerMove = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			pointer.x = e.clientX;
			pointer.y = e.clientY;
			pointer.at = performance.now();
		};

		const update = (f: Fairy, t: number) => {
			let tx = f.tx;
			let ty = f.ty;
			let max = f.speed;
			if (f.companion && t - pointer.at < FOLLOW_MS) {
				const a = t / 900;
				tx = pointer.x + 30 + Math.cos(a) * 22;
				ty = pointer.y - 26 + Math.sin(a * 1.4) * 12;
				max = 2.6;
			} else if (Math.hypot(f.tx - f.x, f.ty - f.y) < 40) {
				f.tx = rand(40, w - 40);
				f.ty = rand(40, h - 40);
			}
			const dx = tx - f.x;
			const dy = ty - f.y;
			const d = Math.hypot(dx, dy) || 1;
			const speed = Math.min(max, d * 0.02 + 0.15);
			f.vx += ((dx / d) * speed - f.vx) * 0.04;
			f.vy += ((dy / d) * speed - f.vy) * 0.04;
			f.x += f.vx;
			f.y += f.vy;
			if (Math.random() < 0.16) {
				f.sparkles.push({
					x: f.x + rand(-5, 5),
					y: f.y + rand(-5, 5),
					vx: rand(-0.12, 0.12),
					vy: rand(0.15, 0.45),
					life: 1,
					decay: rand(0.012, 0.022),
					size: rand(1.6, 3.2),
					seed: rand(0, 6),
				});
			}
		};

		const star = (x: number, y: number, r: number) => {
			ctx.beginPath();
			ctx.moveTo(x, y - r);
			ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.quadraticCurveTo(x, y, x, y + r);
			ctx.quadraticCurveTo(x, y, x - r, y);
			ctx.quadraticCurveTo(x, y, x, y - r);
			ctx.fill();
		};

		const drawSparkles = (f: Fairy, t: number, animate: boolean) => {
			f.sparkles = f.sparkles.filter((s) => {
				if (animate) {
					s.x += s.vx;
					s.y += s.vy;
					s.life -= s.decay;
				}
				const life = Math.max(s.life, 0);
				const twinkle = 0.6 + 0.4 * Math.sin(t / 90 + s.seed);
				ctx.fillStyle = `rgba(${CORE}, ${life * 0.9})`;
				star(s.x, s.y, s.size * twinkle * (0.5 + life * 0.5));
				ctx.fillStyle = `rgba(${AURA}, ${life * 0.35})`;
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.size * 1.6, 0, Math.PI * 2);
				ctx.fill();
				return s.life > 0;
			});
		};

		const drawFairy = (f: Fairy, t: number) => {
			const x = f.x;
			const y = f.y + Math.sin(t / 320 + f.phase) * 4;
			const r = 34 * (1 + Math.sin(t / 260 + f.phase) * 0.08);
			const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
			glow.addColorStop(0, `rgba(${CORE}, 0.95)`);
			glow.addColorStop(0.16, `rgba(${CORE}, 0.7)`);
			glow.addColorStop(0.42, `rgba(${AURA}, 0.32)`);
			glow.addColorStop(1, `rgba(${AURA}, 0)`);
			ctx.fillStyle = glow;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fill();

			const flap = 0.45 + 0.55 * Math.abs(Math.sin(t / 42 + f.phase));
			ctx.fillStyle = `rgba(${CORE}, 0.38)`;
			for (const side of [-1, 1]) {
				ctx.save();
				ctx.translate(x + side * 2, y - 1);
				ctx.scale(flap, 1);
				ctx.beginPath();
				ctx.ellipse(side * 5, -3, 4.6, 2.1, side * -0.6, 0, Math.PI * 2);
				ctx.fill();
				ctx.beginPath();
				ctx.ellipse(side * 4, 2, 3, 1.4, side * 0.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			}
			ctx.fillStyle = `rgb(${CORE})`;
			ctx.beginPath();
			ctx.arc(x, y, 2.8, 0, Math.PI * 2);
			ctx.fill();
		};

		const render = (t: number, animate: boolean) => {
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = 'lighter';
			for (const f of fairies) {
				if (animate) update(f, t);
				drawSparkles(f, t, animate);
				drawFairy(f, t);
			}
			ctx.globalCompositeOperation = 'source-over';
		};

		let frame = 0;
		const loop = (t: number) => {
			render(t, true);
			frame = requestAnimationFrame(loop);
		};
		const start = () => {
			cancelAnimationFrame(frame);
			if (reducedMotion.matches || document.hidden) render(0, false);
			else frame = requestAnimationFrame(loop);
		};
		const onResize = () => {
			resize();
			if (reducedMotion.matches) render(0, false);
		};

		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('resize', onResize);
		document.addEventListener('visibilitychange', start);
		reducedMotion.addEventListener('change', start);
		start();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('visibilitychange', start);
			reducedMotion.removeEventListener('change', start);
		};
	}, [count]);

	return <canvas ref={canvasRef} aria-hidden className='fairies' />;
}
