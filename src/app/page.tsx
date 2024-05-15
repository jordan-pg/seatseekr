"use client";
import { CircularProgress, ThemeProvider } from "@mui/material";
import theme from "@/components/theme/theme";
import Navbar from "@/components/nav/Navbar";
import Home from "@/components/home/Home";
import PopularEvents from "@/components/popularEvents/PopularEvents";
import WhyWeExist from "@/components/whyWeExist/WhyWeExist";
import LeaveFeedback from "@/components/leaveFeedback/LeaveFeedback";
import Footer from "@/components/footer/Footer";
import { LocationProvider } from "@/components/contexts/LocationContext";
import { Suspense } from "react";
import SnackBarDisclaimer from "@/components/snackBarDisclaimer/SnackBarDisclaimer";

export default function Page() {
	return (
		<LocationProvider>
			<ThemeProvider theme={theme}>
				<Suspense fallback={<CircularProgress />}>
					<SnackBarDisclaimer />
					<Navbar />
					<Home />
					<PopularEvents />
					<WhyWeExist />
					<LeaveFeedback />
					<Footer />
				</Suspense>
			</ThemeProvider>
		</LocationProvider>
	);
}
