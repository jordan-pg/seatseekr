"use client";
import {
	CircularProgress,
	Container,
	ThemeProvider,
	Toolbar,
} from "@mui/material";
import theme from "@/components/theme/theme";
import Navbar from "@/components/nav/Navbar";
import ResultList from "@/components/result/Result";
import { Suspense } from "react";

export default function Page() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Container sx={{ pb: 15, pt: 5 }}>
				<Toolbar />
				<Suspense fallback={<CircularProgress />}>
					<ResultList />
				</Suspense>
			</Container>
		</ThemeProvider>
	);
}
