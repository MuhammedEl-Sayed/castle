import { role, wins } from '@/content/work';

export default function Work() {
	return (
		<section id='work' className='mt-24 w-full max-w-3xl'>
			<h2 className='text-3xl font-semibold'>At Work</h2>
			<p className='text-parchment-ink/70 mt-2'>
				{role.title} at {role.company}
			</p>

			<ul className='mt-8 grid sm:grid-cols-2 gap-6 text-left'>
				{wins.map((win) => (
					<li key={win.title} className='border-l-2 border-parchment-accent/60 pl-4'>
						<h3 className='font-semibold'>{win.title}</h3>
						<p className='text-sm text-parchment-ink/70 mt-1'>{win.description}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
