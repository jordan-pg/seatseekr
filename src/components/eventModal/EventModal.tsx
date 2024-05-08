import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogActions,
	Typography,
	Card,
	CardMedia,
	Slide,
	AppBar,
	IconButton,
	Toolbar,
	Box,
	List,
	Popover,
	Alert,
	Snackbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
	Close as CloseIcon,
	InfoRounded,
} from "@mui/icons-material";
import { EventData } from "@/types/types";
import TicketMasterModal from "./TicketMasterModal";
import SeatGeekModal from "./SeatGeekModal";
import GameTimeModal from "./GameTimeModal";

interface EventModalProps {
	open: boolean;
	onClose: () => void;
	event: any;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal: React.FC<EventModalProps> = ({
	open,
	onClose,
	event,
}: {
	open: boolean;
	onClose: any;
	event: EventData;
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// const handleSelected = (eventUrl: string | undefined) => {
	// 	setOpenAlert(true);
	// 	setTimeout(() => {
	// 		window.open(eventUrl, "_blank");
	// 	}, 1000);
	// };

	const openPopover = Boolean(anchorEl);
	const id = openPopover ? "simple-popover" : undefined;

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={onClose}
			TransitionComponent={Transition}
		>
			{event && (
				<>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar>
							<Typography
								sx={{ flex: 1, p: 2 }}
								variant="h6"
								fontWeight="bold"
							>
								Book Your Ticket
							</Typography>
							<IconButton onClick={onClose} color="primary">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Card>
							<Typography
								fontStyle="italic"
								fontSize={12}
								textAlign="center"
								mb={1}
							>
								**Prices include fees**
							</Typography>
							{event?.images && (
								<CardMedia
									title={event?.name}
									sx={{
										height: {
											lg: 225,
											md: 225,
											sm: 180,
											xs: 180,
										},
									}}
									image={event?.images}
								/>
							)}
						</Card>
						<Box>
							<Typography variant="h5" fontWeight="bold" py={2}>
								{event?.name}
							</Typography>
							<Typography variant="subtitle1">
								{event?.venueName} • {event?.venueCity},{" "}
								{event?.venueState}
							</Typography>
							<Typography variant="subtitle1" component="div">
								{event?.date}
							</Typography>
						</Box>
						{event?.info && (
							<Typography variant="body1">
								Additional Information
								<IconButton
									aria-describedby={id}
									onClick={handleClick}
								>
									<InfoRounded color="primary" />
								</IconButton>
								<Popover
									id={id}
									open={openPopover}
									anchorEl={anchorEl}
									onClose={handleClose}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
								>
									<Typography sx={{ p: 2 }}>
										{event?.info}
									</Typography>
								</Popover>
							</Typography>
						)}
					</DialogContent>
				</>
			)}
			<DialogActions>
				<List sx={{ width: "100%" }}>
					{event?.ticketMaster && (
						<TicketMasterModal event={event} />
					)}
					{event?.seatGeek && (
						<SeatGeekModal event={event} />
					)}
					{event?.gameTime && (
						<GameTimeModal event={event} />
					)}
				</List>
				<Snackbar
					open={openAlert}
					autoHideDuration={1000}
					onClose={() => setOpenAlert(false)}
				>
					<Alert
						severity="info"
						sx={{ width: "100%" }}
						onClose={() => setOpenAlert(false)}
					>
						Redirecting to provider
					</Alert>
				</Snackbar>
			</DialogActions>
		</Dialog>
	);
};

export default EventModal;
