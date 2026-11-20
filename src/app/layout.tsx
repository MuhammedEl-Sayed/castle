import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';
import Fairies from '@/components/Fairies';

const display = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
	variable: '--font-display',
});

const body = Lora({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-body',
});

const title = 'Muhammed El-Sayed';
const description =
	'Software engineer. Projects include Valysis, a Valorant stats app, and FrameBoy, a Warframe companion app.';

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

export const viewport: Viewport = {
	themeColor: '#101a16',
	colorScheme: 'dark',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${display.variable} ${body.variable}`}>
			<body>
				<Fairies count={3} />
				{children}
			</body>
		</html>
	);
}
