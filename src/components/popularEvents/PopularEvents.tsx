import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ResultList from "../result/Result";

const PopularEvents: React.FC = () => {
	return (
		<Container sx={{pb: 15}}>
			<section id="popular-events" style={{ minHeight: "100vh" }}>
				<Box mb={8} textAlign="center">
					<Typography
						variant="h5"
						sx={{ fontWeight: "bold" }}
						gutterBottom
					>
						EXPLORE NEARBY
					</Typography>
					<Typography
						variant="h4"
						sx={{ fontWeight: "bold" }}
						color="primary"
						gutterBottom
					>
						POPULAR EVENTS
					</Typography>
				</Box>
				<ResultList popular />
			</section>
		</Container>
	);
};

export default PopularEvents;
