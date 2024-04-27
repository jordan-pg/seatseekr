"use client";
import { Box, Container, ThemeProvider, Toolbar } from "@mui/material";
import theme from "@/components/theme/theme";
import Navbar from "@/components/nav/Navbar";
import ResultList from "@/components/result/Result";

export default function Page() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Container sx={{ pb: 15, pt: 5 }}>
				<Toolbar />
				<ResultList />
			</Container>
		</ThemeProvider>
	);
}
