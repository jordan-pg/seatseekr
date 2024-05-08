"use server";
import { EventData } from "@/types/types";
import axios from "axios";
import moment from "moment-timezone";

export const searchGameTime = async ({ keyword }: { keyword?: string }) => {
	try {
		const getSlug = await axios.get(
			`https://mobile.gametime.co/v1/search?q=${keyword}`
		);

		const slug = await getSlug?.data?.performers?.[0]?.slug;
		const response = await axios.get(
			`https://mobile.gametime.co/v1/events?per_page=20&performer_slug=${slug}`
		);

		const newData: EventData[] = await response?.data?.events?.map(
			(item: any) => {
				const event = item?.event;
				const venue = item?.venue;
				const timezone = venue?.timezone;
				const date = event?.datetime_local;

				const parsedDate = moment.tz(date, timezone);
				const formattedDate = parsedDate.format(
					"ddd MMM Do, YYYY @ h:mm a"
				);

				return {
					event: event,
					name: event?.name,
					date: formattedDate,
					localDate: date,
					timezone: timezone,
					info: null,
					venueName: venue?.name,
					venueCity: venue?.city,
					venueState: venue?.state,
					images: item?.performers?.[0]?.hero_image_url,
					gameTime: {
						gameTimePrice: event?.min_price?.total / 100,
						gameTimeId: String(event?.id),
						gameTimeUrl: `https://gametime.co/events/${event?.id}`,
					},
				};
			}
		);

		return newData;
	} catch (error) {
		console.error(error);
	}
};
