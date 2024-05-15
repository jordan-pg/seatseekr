import { ChevronRight } from "@mui/icons-material";
import { Box, Typography, ListItemButton } from "@mui/material";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const TicketMasterModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<ListItemButton
				sx={{ justifyContent: "space-between", bgcolor: "#3D5A80", my: .5 }}
				href={String(event?.ticketMaster?.ticketMasterUrl)}
				rel="noopener noreferrer"
				target="_blank"
				divider
			>
				<Box>
					<Typography variant="subtitle1" fontWeight="bold">
						Ticketmaster
					</Typography>
					<Typography
						variant="subtitle2"
						color={theme.palette.primary.main}
					>
						{event?.ticketMaster?.ticketMasterPrice ? (
							<>
								Starting at{" "}
								<b
									style={{
										color: "limegreen",
									}}
								>
									$
									{Math.floor(
										event?.ticketMaster?.ticketMasterPrice
									)}
								</b>
							</>
						) : (
							"Click select for more details"
						)}
					</Typography>
				</Box>
				<Box display="inline-flex">
					<ChevronRight />
				</Box>
			</ListItemButton>
		</>
	);
};

export default TicketMasterModal;
