import { ChevronRight } from "@mui/icons-material";
import { Divider, ListItem, Box, Typography } from "@mui/material";
import Link from "next/link";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const SeatGeekModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<Divider sx={{ borderColor: "white" }} />
			<ListItem sx={{ justifyContent: "space-between" }}>
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
				<Link
					href={String(event?.seatGeek?.seatGeekUrl)}
					rel="noopener noreferrer"
					target="_blank"
					style={{
						color: theme.palette.primary.main,
					}}
				>
					<Box display="inline-flex">
						<Typography
							variant="subtitle1"
							color={theme.palette.primary.main}
							fontWeight="bold"
							sx={{ textDecoration: "underline" }}
						>
							Select
						</Typography>
						<ChevronRight />
					</Box>
				</Link>
			</ListItem>
		</>
	);
};

export default SeatGeekModal;
