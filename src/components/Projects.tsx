import Image from 'next/image';
import Gem from '@/components/Gem';
import { projects } from '@/content/projects';

export default function Projects() {
	return (
		<section id='projects' className='projects'>
			<h2>Projects</h2>
			<div className='divider' aria-hidden>
				<span />
				<Gem />
				<span />
			</div>

			<div className='grid'>
				{projects.map((project) => (
					<article key={project.name} className='card'>
						<div className='icon-wrap'>
							<div className='rays' />
							<div className='icon'>
								{project.image ? (
									<div className='icon-image' style={{ background: project.imageBackground }}>
										<Image src={project.image} alt={`${project.name} logo`} fill sizes='80px' />
									</div>
								) : (
									<span aria-hidden className='icon-letter'>
										{project.name[0].toUpperCase()}
									</span>
								)}
							</div>
						</div>
						<h3>{project.name}</h3>
						<p>{project.description}</p>
						{project.status && (
							<p className='status'>
								<Gem />
								{project.status}
							</p>
						)}
						<a href={project.link.href} target='_blank' rel='noopener noreferrer'>
							{project.link.label} →
						</a>
					</article>
				))}
			</div>

			<p className='more'>
				More on{' '}
				<a href='https://github.com/MuhammedEl-Sayed' target='_blank' rel='noopener noreferrer'>
					GitHub
				</a>
			</p>
		</section>
	);
}
