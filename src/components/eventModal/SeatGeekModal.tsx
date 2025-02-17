import { ChevronRight } from "@mui/icons-material";
import { Divider, Box, Typography, ListItemButton } from "@mui/material";
import Link from "next/link";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const SeatGeekModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<ListItemButton
				sx={{ justifyContent: "space-between", bgcolor: "#3D5A80", my: .5 }}
				href={String(event?.seatGeek?.seatGeekUrl)}
				rel="noopener noreferrer"
				target="_blank"
				divider
			>
				<Box>
					<Typography variant="subtitle1" fontWeight="bold">
						SeatGeek
					</Typography>
					<Typography
						variant="subtitle2"
						color={theme.palette.primary.main}
					>
						{event?.seatGeek?.seatGeekPrice ? (
							<>
								Starting at{" "}
								<b
									style={{
										color: "limegreen",
									}}
								>
									$
									{Math.floor(event?.seatGeek?.seatGeekPrice)}
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

export default SeatGeekModal;
