export type Win = {
	title: string;
	description: string;
};

export const role = {
	title: 'Infrastructure Engineer',
	company: 'Remedy',
};

export const wins: Win[] = [
	{
		title: 'An AI on-call agent',
		description:
			'Built an agent that investigates every production alert, decides whether it needs a person, and then files a ticket or pages the team that owns it. Engineers can agree with or overrule each call straight from Slack.',
	},
	{
		title: 'Monitoring as code',
		description:
			'Moved our Datadog monitors into the repo with a sync, so alerts get reviewed like any other code change instead of being edited by hand.',
	},
	{
		title: 'Marketing pixels without deploys',
		description:
			'Moved hardcoded affiliate tracking pixels into an admin tool, so the marketing team can add or change one without a code change, and cleared out the stale ones along the way.',
	},
	{
		title: 'Safer checkout',
		description:
			'Added a checkout guard that refuses an order when the shipping state would change whether the patient qualifies for treatment.',
	},
];
