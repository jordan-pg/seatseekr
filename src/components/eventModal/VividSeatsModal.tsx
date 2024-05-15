import { ChevronRight } from "@mui/icons-material";
import { Divider, Box, Typography, ListItemButton } from "@mui/material";
import Link from "next/link";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const VividSeatsModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<ListItemButton
				sx={{ justifyContent: "space-between", bgcolor: "#3D5A80", my: .5 }}
				href={String(event?.vividSeats?.vividSeatsUrl)}
				rel="noopener noreferrer"
				target="_blank"
				divider
			>
				<Box>
					<Typography variant="subtitle1" fontWeight="bold">
						Vivid Seats
					</Typography>
					<Typography
						variant="subtitle2"
						color={theme.palette.primary.main}
					>
						{event?.vividSeats?.vividSeatsPrice ? (
							<>
								Starting at{" "}
								<b
									style={{
										color: "limegreen",
									}}
								>
									$
									{Math.floor(
										event?.vividSeats?.vividSeatsPrice
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

export default VividSeatsModal;
