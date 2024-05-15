import React, { useState } from "react";
import { styled } from "@mui/system";
import {
	Container,
	Typography,
} from "@mui/material";
import Searchbar from "@/components/searchbar/Searchbar";

const Background = styled("div")`
	background-image: url("home-background.png");
	background-size: cover;
	background-position: center;
	height: 100vh; /* Adjust the height as needed */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Row = styled("div")`
	width: 90%;
	margin: auto;
`;

const Home = () => {
	return (
		<Background id="home">
			<Container>
				<Typography
					variant="h4"
					fontWeight="bold"
					mb={2}
					textAlign="center"
				>
					Explore Countless Cheap Event Tickets
				</Typography>
				<Typography variant="h6" mb={6} textAlign="center">
					Compare prices from Ticketmaster, Seatgeek, Vivid Seats and
					more!
				</Typography>
				<Row>
					{/* <Row sx={{ pb: 2 }}>
						<TextField
							InputProps={{ sx: { borderRadius: 52 } }}
							placeholder="Email Address"
							type="email"
							fullWidth
						/>
					</Row> */}
					<Row>
						{/* <Button fullWidth>GET NOTIFIED</Button> */}
						<Searchbar />
					</Row>
				</Row>
			</Container>
		</Background>
	);
};

export default Home;
