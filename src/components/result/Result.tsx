import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Skeleton,
	Typography,
} from "@mui/material";
import { AttachMoney, ChevronRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import theme from "../theme/theme";
import { useEffect, useState } from "react";
import Geohash from "latlon-geohash";
import { useSearchParams } from "next/navigation";
import EventModal from "../eventModal/EventModal";
import Searchbar from "@/components/searchbar/Searchbar";
import { EventData, Location } from "@/types/types";
import { searchEvents, searchPopularEvents } from "@/api/combinedActions";

const StyledCard = styled(Card)(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.background.paper,
	"&:hover .overlay": {
		opacity: 1,
	},
}));

const Overlay = styled("div")(({ theme }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(152, 193, 217, 0.5)",
	opacity: 0,
	transition: "opacity 0.3s ease",
	cursor: "pointer",
}));

const ResultList = ({ popular }: { popular?: boolean }) => {
	const searchParams = useSearchParams();
	const eventParams = searchParams.get("keyword") as string;
	const [data, setData] = useState<EventData[]>([]);
	const [location, setLocation] = useState<Location | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!location) {
			navigator.geolocation.getCurrentPosition((position) => {
				const geoLocation = Geohash.encode(
					position.coords.latitude,
					position.coords.longitude,
					7
				);

				setLocation({
					hashLocation: geoLocation,
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			});
		}
	}, []);

	useEffect(() => {
		setLoading(true);

		if (popular) {
			searchPopularEvents({ location }).then((res) => {
				setData(res as any);
				setLoading(false);
			});
		} else {
			searchEvents({ keyword: eventParams }).then((res) => {
				setData(res as any);
				setLoading(false);
			});
		}
	}, [popular, eventParams, location]);

	const handleOpenModal = (event: any) => {
		setSelectedEvent(event);
		setOpen(true);
	};

	return (
		<Box sx={{ width: "100%" }}>
			{!popular && <Searchbar incomingValue={eventParams} />}
			{loading ? (
				<Grid container spacing={2} mt={4}>
					<Grid xs={12} md>
						<Skeleton
							variant="rounded"
							width={"100%"}
							height={"50vh"}
						/>
					</Grid>
					<Grid xs={12} md>
						<Skeleton
							variant="rounded"
							width={"100%"}
							height={"50vh"}
						/>
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					rowSpacing={3}
					columnSpacing={3}
					pt={4}
					columns={{ xs: 1, sm: 6, md: 12 }}
				>
					{data &&
						data?.map((item: EventData) => {
							const minPrice = Math.min(
								...[
									item?.seatGeek?.seatGeekPrice || Infinity,
									item?.ticketMaster?.ticketMasterPrice ||
										Infinity,
								]
							);

							return (
								<Grid
									xs={6}
									key={
										item?.ticketMaster?.ticketMasterId ||
										item?.seatGeek?.seatGeekId
									}
								>
									<StyledCard
										raised
										onClick={() => handleOpenModal(item)}
									>
										<CardHeader
											avatar={
												<Avatar
													sx={{
														bgcolor:
															theme.palette
																.primary.main,
														width: 24,
														height: 24,
													}}
													aria-label="recipe"
												>
													<AttachMoney />
												</Avatar>
											}
											title={
												minPrice &&
												minPrice !== Infinity ? (
													<>
														Starting at{" "}
														<b>
															$
															{Math.floor(
																minPrice
															)}
														</b>
													</>
												) : (
													<>Price unavailable</>
												)
											}
										/>
										<CardMedia
											sx={{ height: 225 }}
											image={
												item?.images &&
												item?.images?.length > 0
													? `${item?.images?.[0]?.url}?w=248&auto=format`
													: `https://images.pexels.com/photos/301673/pexels-photo-301673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
											}
											title={item.images?.[0]?.url}
										/>
										<CardContent
											sx={{
												display: "inline-flex",
												justifyContent: "space-between",
												width: "100%",
											}}
										>
											<Box>
												<Typography
													gutterBottom
													variant="h5"
													component="div"
													fontWeight="bold"
												>
													{item?.name}
												</Typography>
												<Typography
													gutterBottom
													variant="subtitle1"
													component="div"
												>
													{item?.venueName}
												</Typography>
												<Typography
													gutterBottom
													variant="subtitle1"
													component="div"
												>
													{item?.date || null}
												</Typography>
											</Box>
											<ChevronRight />
										</CardContent>
										<Overlay className="overlay" />
									</StyledCard>
								</Grid>
							);
						})}
				</Grid>
			)}
			<EventModal
				open={open}
				onClose={() => setOpen(!open)}
				event={selectedEvent}
			/>
		</Box>
	);
};

export default ResultList;
