export type Project = {
	name: string;
	description: string;
	image?: string;
	imageBackground?: string;
	status?: string;
	link: { href: string; label: string };
};

export const projects: Project[] = [
	{
		name: 'Valysis',
		description:
			'Cross-platform Flutter app for Valorant players to analyze and improve their gameplay through detailed stats and insights.',
		image: '/projects/valysis.png',
		link: { href: 'https://valysis.com/', label: 'Visit valysis.com' },
	},
	{
		name: 'FrameBoy',
		description: 'Tracks Warframe recipes, relics and resources from your phone.',
		image: '/projects/frameboy.png',
		imageBackground: '#202020',
		status: 'Coming soon to iOS and Android',
		link: { href: 'https://frameboy.app/', label: 'Visit frameboy.app' },
	},
	{
		name: 'yarn',
		description: 'Mobile todo and chores app written in Flutter.',
		link: {
			href: 'https://github.com/MuhammedEl-Sayed/yarn',
			label: 'View on GitHub',
		},
	},
];
