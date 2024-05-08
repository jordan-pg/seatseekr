import { ChevronRight } from "@mui/icons-material";
import { Divider, ListItem, Box, Typography } from "@mui/material";
import Link from "next/link";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const TicketMasterModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<Divider sx={{ borderColor: "white" }} />
			<ListItem sx={{ justifyContent: "space-between" }}>
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
				<Link
					href={String(event?.ticketMaster?.ticketMasterUrl)}
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

export default TicketMasterModal;
