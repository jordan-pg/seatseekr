"use server";
import { EventData } from "@/types/types";
import axios from "axios";
import moment from "moment-timezone";

export const searchVividSeats = async ({ keyword }: { keyword?: string }) => {
	try {
		const response = await axios.get(
			`https://www.vividseats.com/hermes/api/v1/search-suggestions?query=${keyword}`
		);

		const newData: EventData[] = await response?.data?.productions?.map(
			(event: any) => {
				const venue = event?.venue;
				const date = event?.localDate;

				const dateTime = date?.split('[')[0];
				const timeZone = date?.match(/\[(.*?)\]/)[1];
				const formattedDate = moment.tz(dateTime, timeZone).format("ddd MMM Do, YYYY @ h:mm a");

				return {
					name: event?.name,
					date: formattedDate,
					localDate: null,
					timezone: null,
					info: null,
					venueName: venue?.name,
					venueCity: venue?.city,
					venueState: venue?.state,
					images: null,
					vividSeats: {
						vividSeatsPrice: event?.minPrice,
						vividSeatsId: String(event?.id),
						vividSeatsUrl: `https://vividseats.com${event?.webPath}`,
					},
				};
			}
		);

		return newData;
	} catch (error) {
		console.error(error);
	}
};
