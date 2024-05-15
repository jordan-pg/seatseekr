import { ChevronRight } from "@mui/icons-material";
import { Box, Typography, ListItemButton } from "@mui/material";
import theme from "../theme/theme";
import { EventData } from "@/types/types";

const GameTimeModal = ({ event }: { event: EventData }) => {
	return (
		<>
			<ListItemButton
				sx={{ justifyContent: "space-between", bgcolor: "#3D5A80", my: .5 }}
				href={String(event?.gameTime?.gameTimeUrl)}
				rel="noopener noreferrer"
				target="_blank"
				divider
			>
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
				<Box>
					<ChevronRight />
				</Box>
			</ListItemButton>
		</>
	);
};

export default GameTimeModal;
