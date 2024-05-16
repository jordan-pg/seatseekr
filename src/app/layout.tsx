import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
	title: "SeatWyze - Discover Cheap Tickets",
	description: "Explore Countless Cheap Events with a Single Search",
	icons: {
		icon: [
		  {
			url: '/favicon.ico',
			href: '/favicon.ico',
		  },
		  {
			url: '/apple-touch-icon.png',
			href: '/apple-touch-icon.png',
		  },
		  {
			url: '/android-chrome-192x192.png',
			href: '/android-chrome-192x192.png',
		  },
		  {
			url: '/android-chrome-512x512.png',
			href: '/android-chrome-512x512.png',
		  },
		],
	  },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<body style={{ margin: 0 }} className={inter.className}>
				{children}
			</body>
		</html>
	);
}
