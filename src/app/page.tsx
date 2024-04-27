"use client";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/components/theme/theme";
import Navbar from "@/components/nav/Navbar";
import Home from "@/components/home/Home";
import PopularEvents from "@/components/popularEvents/PopularEvents";
import WhyWeExist from "@/components/whyWeExist/WhyWeExist";
import LeaveFeedback from "@/components/leaveFeedback/LeaveFeedback";
import Footer from "@/components/footer/Footer";

export default function Page() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Home />
			<PopularEvents />
			<WhyWeExist />
			<LeaveFeedback />
			<Footer />
		</ThemeProvider>
	);
}
