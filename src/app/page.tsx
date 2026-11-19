import Image from 'next/image';
import Projects from '@/components/Projects';

const links = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'GitHub', href: 'https://github.com/MuhammedEl-Sayed' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammedelsayed/' },
];

export default function Home() {
	return (
		<main className='relative z-10 max-w-6xl mx-auto p-6 flex flex-col items-center text-center'>
			<header className='w-full flex flex-col sm:flex-row gap-4 justify-between items-center mb-14'>
				<p className='text-3xl font-bold'>Well Met, Traveler</p>
				<nav className='flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm uppercase tracking-widest text-parchment-ink/70'>
					{links.map(({ label, href }) => {
						const external = href.startsWith('http');
						return (
							<a
								key={label}
								href={href}
								className='hover:text-parchment-accent transition-colors'
								{...(external && { target: '_blank', rel: 'noopener noreferrer' })}
							>
								{label}
							</a>
						);
					})}
				</nav>
			</header>

			<section className='max-w-2xl flex flex-col items-center'>
				<h1 className='text-5xl sm:text-7xl font-bold leading-tight'>
					Fantasy, Code, & Curiosity
				</h1>
				<p className='text-xl sm:text-2xl font-bold mt-2'>by Muhammed El-Sayed</p>

				<div className='relative mt-10 w-44 h-44 rounded-full overflow-hidden border-8 border-white/70 shadow-[0_15px_40px_rgba(0,0,0,0.15)]'>
					<Image
						src='/profile.png'
						alt='Illustrated portrait of Muhammed El-Sayed'
						fill
						priority
						sizes='176px'
						className='object-cover filter sepia-[0.25] brightness-[0.96]'
					/>
					<div className='absolute inset-0 rounded-full shadow-inner shadow-black/30 pointer-events-none' />
				</div>

				<p className='text-lg text-parchment-ink/80 mt-10'>
					I&apos;m an infrastructure engineer at Remedy, where I build the tools that keep
					a healthcare platform running: on-call automation, monitoring, and internal
					apps. Outside of work I build apps for the games I play.
				</p>
			</section>

			<Projects />

			<footer className='mt-24 text-sm text-parchment-ink/60'>
				© {new Date().getFullYear()} Muhammed El-Sayed. Built with Next.js.
			</footer>
		</main>
	);
}
