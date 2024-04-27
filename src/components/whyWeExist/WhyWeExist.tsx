import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const BackgroundSection = styled("section")({
	minHeight: "90vh",
	backgroundImage: "url('baseball.png')",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
});

const WhyWeExist: React.FC = () => {
	return (
		<div style={{minHeight: '100vh'}}>
		<BackgroundSection id="why-we-exist">
			<Container sx={{ pt: 15 }}>
				<Box mb={4} textAlign="center">
					<Typography
						variant="h5"
						sx={{ fontWeight: "bold" }}
						gutterBottom
					>
						Why
					</Typography>
					<Typography
						variant="h4"
						sx={{ fontWeight: "bold" }}
						color="primary"
						gutterBottom
					>
						We Exist
					</Typography>
				</Box>
				<Box alignItems="center" textAlign="center">
					<Typography variant="subtitle1" component="div" mb={5}>
						As devoted Padres fans, my friend and I wished for a
						simpler way to find affordable game tickets without the
						hassle of navigating multiple websites like SeatGeek,
						Ticketmaster, Vivid Seats, and TickPick. That&apos;s why we
						came together with a shared passion for all sports to
						make it easier for fellow fans. Our mission is clear: to
						help sports enthusiasts of all kinds discover the best
						deals, ensuring that the thrill of the game is
						accessible to everyone. Our vision is simple: to connect
						fans with their favorite sports, one budget-friendly
						ticket at a time.
					</Typography>
				</Box>
			</Container>
		</BackgroundSection>
		</div>
	);
};

export default WhyWeExist;
