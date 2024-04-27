import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
	Alert,
	Box,
	Button,
	Container,
	IconButton,
	Link,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import Searchbar from "@/components/searchbar/Searchbar";
import CloseIcon from "@mui/icons-material/Cancel";
import theme from "../theme/theme";
import {data as testData} from './data'

// Styled component for the background image
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

	async function generatePDF(data: any) {
		const url = 'https://generateresumepdf-tl7oxsojoq-uc.a.run.app';
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
	
		return await response.blob();
	}
	
	// Example usage
	generatePDF({ data: testData, type: 'modern' })
		.then(pdfBlob => {
			console.log(pdfBlob)
			// Handle the PDF blob here (e.g., download or display it)
			const url = window.URL.createObjectURL(new Blob([pdfBlob]));
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = 'document.pdf';
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
		
		})
		.catch(error => {
			console.error('Failed to generate PDF:', error);
		});
	


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
