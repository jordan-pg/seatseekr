import { Box, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
	return (
		<footer>
			<Box
				sx={{
					backgroundColor: "rgb(33, 33, 33)",
					textAlign: "center",
					p: 1,
				}}
			>
				<Typography variant="subtitle1">
					Copyright © SeatSeekr 2023.
				</Typography>
			</Box>
		</footer>
	);
};

export default Footer;
