import { EventData } from "@/types/types";
import axios from "axios";
import moment from "moment-timezone";

const API_BASE_URL = "https://api.seatgeek.com/2/";
const sanitizeString = (str: string) => str.replace(/\s*-.*$/, "");

export const searchSeatGeekEvents = async ({
	keyword,
	date,
}: {
	keyword?: string;
	date?: string;
}) => {
	const newKeyword = keyword?.split(" ").join("-");

	try {
		const response = await axios.get(`${API_BASE_URL}events`, {
			params: {
				client_id: process.env.NEXT_PUBLIC_SEAT_GEEK_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_SEAT_GEEK_APP_SECRET,
				"performers.slug": newKeyword,
				datetime_utc: date,
				per_page: 20,
			},
		});

		const newData: EventData[] = await response?.data?.events?.map(
			(event: any) => {
				const timezone = event?.venue?.timezone;
				const date = event?.datetime_local;

				const parsedDate = moment.tz(date, timezone);
				const formattedDate = parsedDate.format(
					"ddd MMM Do, YYYY @ h:mm a"
				);

				return {
					name: event?.title,
					date: formattedDate,
					localDate: date,
					timezone: timezone,
					info: null,
					venueName: sanitizeString(event?.venue?.name),
					venueCity: event?.venue?.city,
					venueState: event?.venue?.state,
					images: null,
					seatGeek: {
						seatGeekPrice: event?.stats?.lowest_price,
						seatGeekId: String(event?.id),
						seatGeekUrl: event?.url,
					},
				};
			}
		);

		return newData;
	} catch (error) {
		console.log(error);
	}
};

export const searchPopularSeatGeekEvents = async ({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}) => {
	try {
		const response = await axios.get(`${API_BASE_URL}events`, {
			params: {
				client_id: process.env.NEXT_PUBLIC_SEAT_GEEK_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_SEAT_GEEK_APP_SECRET,
				lat,
				lon,
				"taxonomies.name": 'sports',
				per_page: 20,
			},
		});

		const newData: EventData[] = await response?.data?.events?.map(
			(event: any) => {
				const timezone = event?.venue?.timezone;
				const date = event?.datetime_local;

				const parsedDate = moment.tz(date, timezone);
				const formattedDate = parsedDate.format(
					"ddd MMM Do, YYYY @ h:mm a"
				);

				return {
					name: event?.title,
					date: formattedDate,
					localDate: date,
					timezone: timezone,
					info: null,
					venueName: sanitizeString(event?.venue?.name),
					venueCity: event?.venue?.city,
					venueState: event?.venue?.state,
					images: null,
					seatGeek: {
						seatGeekPrice: event?.stats?.lowest_price,
						seatGeekId: String(event?.id),
						seatGeekUrl: event?.url,
					},
				};
			}
		);

		return newData;
	} catch (error) {
		console.log(error);
	}
};
