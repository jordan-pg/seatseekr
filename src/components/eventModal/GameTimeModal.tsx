import { ChevronRight } from "@mui/icons-material";
import { Divider, ListItem, Box, Typography } from "@mui/material";
import Link from "next/link";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const GameTimeModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<Divider sx={{ borderColor: "white" }} />
			<ListItem sx={{ justifyContent: "space-between" }}>
				<Box>
					<Typography variant="subtitle1" fontWeight="bold">
						GameTime
					</Typography>
					<Typography
						variant="subtitle2"
						color={theme.palette.primary.main}
					>
						{event?.gameTime?.gameTimePrice ? (
							<>
								Starting at{" "}
								<b
									style={{
										color: "limegreen",
									}}
								>
									$
									{Math.floor(event?.gameTime?.gameTimePrice)}
								</b>
							</>
						) : (
							"Click select for more details"
						)}
					</Typography>
				</Box>
				<Link
					href={String(event?.gameTime?.gameTimeUrl)}
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

export default GameTimeModal;
