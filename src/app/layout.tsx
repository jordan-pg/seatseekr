import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
	title: "SeatSeekr - Discover Cheap Tickets",
	description: "Explore Countless Cheap Events with a Single Search",
	icons: {
		icon: ["/favicon.ico", "/apple-touch-icon.png", "/android-chrome-192x192.png", "/android-chrome-512x512.png"]
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
