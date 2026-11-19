import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import './globals.css';
import NaviCanvas from '@/components/NaviCanvas';

const lora = Lora({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
});

const title = 'Muhammed El-Sayed';
const description =
	'Infrastructure engineer at Remedy. Projects include Valysis, a Valorant stats app, and FrameBoy, a Warframe companion app.';

export const metadata: Metadata = {
	metadataBase: new URL('https://muhammed-elsayed.com'),
	title,
	description,
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		url: '/',
		title,
		description,
		images: [{ url: '/profile.png', width: 600, height: 600, alt: 'Illustrated portrait of Muhammed El-Sayed' }],
	},
	twitter: {
		card: 'summary',
		title,
		description,
		images: ['/profile.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${lora.className} bg-parchment-texture min-h-screen text-parchment-ink antialiased`}
			>
				<NaviCanvas count={3} />
				{children}
			</body>
		</html>
	);
}
