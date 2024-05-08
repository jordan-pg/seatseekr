import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
	Alert,
	Box,
	Container,
	IconButton,
	Link,
	Snackbar,
	Typography,
} from "@mui/material";
import Searchbar from "@/components/searchbar/Searchbar";
import CloseIcon from "@mui/icons-material/Cancel";
import theme from "../theme/theme";
import { searchStubHub } from "@/api/stubHubActions";
import { searchGameTime } from "@/api/gameTimeActions";

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
	const [open, setOpen] = useState<boolean>(true);
	const [seeMore, setSeeMore] = useState<boolean>(false);

	useEffect(() => {
		searchGameTime({ keyword: 'padres' }).then((res) => {
			console.log('RESPONSE', res)
		})
	}, [])

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
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={open}
			>
				<Alert
					icon={false}
					severity="info"
					sx={{ fontFamily: "Raleway" }}
				>
					<Box display="inline-flex" gap={1}>
						<IconButton
							size="small"
							aria-label="close"
							color="info"
							onClick={() => setOpen(false)}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
						<Box>
							<Typography
								variant="body1"
								color={theme.palette.info.dark}
							>
								Disclaimer: We&apos;re here because, just like
								you...
								{"  "}{" "}
								{seeMore ? (
									<>
										we wanted to catch the coolest events
										without wiping out our bank accounts.
										Our website doesn&apos;t sell tickets -
										we&apos;re all about finding you the
										best deals. We scour the industry to
										uncover the most affordable prices and
										connect you with popular ticketing sites
										like Ticketmaster, SeatGeek, and Vivid
										Seats. Don&apos;t miss out on
										unforgettable moments; let us help you
										get the best deals!
									</>
								) : (
									<Link
										color={theme.palette.info.main}
										sx={{ cursor: "pointer" }}
										onClick={() => setSeeMore(true)}
									>
										See More
									</Link>
								)}
							</Typography>
						</Box>
					</Box>
				</Alert>
			</Snackbar>
		</Background>
	);
};

export default Home;
