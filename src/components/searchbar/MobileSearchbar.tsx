import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "./Searchbar";

const MobileSearchbar = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Box sx={{ display: { lg: "none" } }}>
			<React.Fragment key="top">
				<IconButton color="inherit" onClick={() => setOpen(!open)}>
					<SearchIcon />
				</IconButton>
				<SwipeableDrawer
					anchor="top"
					open={open}
					onClose={() => setOpen(!open)}
					onOpen={() => setOpen(!open)}
				>
					<Box p={3}>
						<Typography
							variant="subtitle1"
							fontWeight="bold"
							mb={3}
							textAlign="left"
						>
							Search For Cheap Event Tickets
						</Typography>
						<Searchbar />
					</Box>
				</SwipeableDrawer>
			</React.Fragment>
		</Box>
	);
};

export default MobileSearchbar;
