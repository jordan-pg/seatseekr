import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const BackgroundSection = styled("section")({
	minHeight: "100vh",
	backgroundImage: "url('feedback.png')",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
});

const LeaveFeedback: React.FC = () => {
	return (
		<BackgroundSection id="leave-feedback">
			<Container sx={{ pt: 15 }}>
				<Box mb={4} textAlign="center">
					<Typography
						variant="h5"
						sx={{ fontWeight: "bold" }}
						gutterBottom
					>
						Let&apos;s Connect
					</Typography>
					<Typography
						variant="h4"
						sx={{ fontWeight: "bold" }}
						color="primary"
						gutterBottom
					>
						Talk To Us!
					</Typography>
				</Box>
				<Box alignItems="center" textAlign="center">
					<Typography variant="subtitle1" component="div" mb={5}>
						{/* We would love to know how we&apos;re doing! Good or bad,
						give us your feedback in this google form. */}
						From one fan to another, let&apos;s make it as easy as
						possible to buy cheap tickets. If you have any
						suggestions, let&apos;s connect!
					</Typography>
					<Button
						sx={{ px: 3 }}
						onClick={() =>
							window.open("https://forms.gle/GkpQotQUK6eqExAz6")
						}
					>
						Talk To Us
					</Button>
				</Box>
			</Container>
		</BackgroundSection>
	);
};

export default LeaveFeedback;
