import {
	Snackbar,
	Alert,
	Box,
	IconButton,
	Typography,
	Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import CloseIcon from "@mui/icons-material/Cancel";

const SnackBarDisclaimer = () => {
	const [seeMore, setSeeMore] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const firstVisit = localStorage.getItem("firstVisit") === null;
		if (firstVisit) {
			setOpen(true);
			localStorage.setItem("firstVisit", "no");
		}
	}, []);

	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={open}
			onClose={() => setOpen(false)}
		>
			<Alert icon={false} severity="info" sx={{ fontFamily: "Raleway" }}>
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
									without wiping out our bank accounts. Our
									website doesn&apos;t sell tickets -
									we&apos;re all about finding you the best
									deals. We scour the industry to uncover the
									most affordable prices and connect you with
									popular ticketing sites like Ticketmaster,
									SeatGeek, and Vivid Seats. Don&apos;t miss
									out on unforgettable moments; let us help
									you get the best deals!
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
	);
};

export default SnackBarDisclaimer;
