import Image from 'next/image';
import Gem from '@/components/Gem';
import Projects from '@/components/Projects';

const links = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'GitHub', href: 'https://github.com/MuhammedEl-Sayed' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammedelsayed/' },
];

export default function Home() {
	return (
		<div className='page'>
			<header className='top'>
				<a className='mark' href='#'>
					<Gem />
					muhammed
				</a>
				<nav className='nav'>
					{links.map(({ label, href }) => (
						<a
							key={label}
							href={href}
							{...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
						>
							{label}
						</a>
					))}
				</nav>
			</header>

			<main>
				<section className='hero'>
					<div className='medallion'>
						<div className='medallion-image'>
							<Image
								src='/profile.png'
								alt='Illustrated portrait of Muhammed El-Sayed'
								fill
								priority
								sizes='168px'
							/>
						</div>
					</div>
					<h1>
						Muhammed <span className='nowrap'>El-Sayed</span>
					</h1>
					<p className='intro'>
						I&apos;m a software engineer. On the side I build companion apps for the games I
						play, like Valysis for Valorant and FrameBoy for Warframe.
					</p>
				</section>

				<Projects />
			</main>

			<footer className='footer'>© {new Date().getFullYear()} Muhammed El-Sayed</footer>
		</div>
	);
}
