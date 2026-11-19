import Image from 'next/image';
import { projects } from '@/content/projects';

export default function Projects() {
	return (
		<section id='projects' className='mt-24 w-full'>
			<h2 className='text-3xl font-semibold mb-8'>My Projects</h2>

			<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{projects.map((project) => (
					<article
						key={project.name}
						className='bg-white/30 border border-black/10 rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0 transition-all flex flex-col items-center'
					>
						<div
							className='relative w-22 h-22 rounded-full overflow-hidden border-8 border-white/70 shadow-[0_15px_40px_rgba(0,0,0,0.15)] mb-4 bg-parchment-mid flex items-center justify-center'
							style={project.imageBackground ? { background: project.imageBackground, backgroundClip: 'padding-box' } : undefined}
						>
							{project.image ? (
								<Image
									src={project.image}
									alt={`${project.name} logo`}
									fill
									sizes='88px'
									className='object-cover filter sepia-[0.25] brightness-[0.96]'
								/>
							) : (
								<span aria-hidden className='text-3xl font-bold text-parchment-accent'>
									{project.name[0].toUpperCase()}
								</span>
							)}
							<div className='absolute inset-0 rounded-full shadow-inner shadow-black/30 pointer-events-none' />
						</div>
						<h3 className='text-xl font-semibold'>{project.name}</h3>
						<p className='text-sm text-parchment-ink/70 mt-2 grow'>{project.description}</p>
						{project.status && (
							<p className='text-xs uppercase tracking-widest text-parchment-ink/50 mt-3'>
								{project.status}
							</p>
						)}
						<a
							href={project.link.href}
							target='_blank'
							rel='noopener noreferrer'
							className='text-parchment-accent mt-3 inline-block text-sm underline-offset-4 hover:underline'
						>
							{project.link.label} →
						</a>
					</article>
				))}
			</div>

			<p className='mt-8 text-sm text-parchment-ink/70'>
				More on{' '}
				<a
					href='https://github.com/MuhammedEl-Sayed'
					target='_blank'
					rel='noopener noreferrer'
					className='text-parchment-accent underline-offset-4 hover:underline'
				>
					GitHub
				</a>
			</p>
		</section>
	);
}
