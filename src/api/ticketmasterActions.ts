"use server";
import { EventData } from "@/types/types";
import axios from "axios";
import moment from "moment-timezone";

const API_BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

export const handleSuggestedEvents = async ({
	location,
	keyword,
}: {
	location?: string;
	keyword?: string;
}) => {
	try {
		const response = await axios.get(`${API_BASE_URL}suggest.json`, {
			params: {
				geoPoint: location,
				apikey: process.env.NEXT_PUBLIC_TICKET_MASTER_KEY,
				keyword,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const searchTicketMasterEvents = async ({
	keyword,
}: {
	keyword?: string;
}) => {
	try {
		const response = await axios.get(`${API_BASE_URL}events.json`, {
			params: {
				apikey: process.env.NEXT_PUBLIC_TICKET_MASTER_KEY,
				keyword,
			},
		});

		const newData: EventData[] = await response?.data?._embedded?.events
			?.map((event: any) => {
				const timezone = event?.dates?.timezone;

				let date;

				if (
					event?.dates?.start?.localDate &&
					event?.dates?.start?.localTime
				) {
					const combinedLocalDateTime = `${event?.dates?.start?.localDate}T${event?.dates?.start?.localTime}`;
					const formattedLocalDateTime = moment(
						combinedLocalDateTime
					).format("ddd MMM Do, YYYY @ h:mm a");

					date = formattedLocalDateTime;
				} else {
					return null;
				}

				if (
					event?.url &&
					!event?.name?.includes("HALF PRICE") &&
					!event?.name?.includes("Tailgate")
				) {
					return {
						name: event?.name,
						date,
						localDate: event?.dates?.start?.localDate,
						timezone: timezone,
						info: event?.info,
						venueName: event?._embedded?.venues?.[0]?.name?.trim(),
						venueCity: event?._embedded?.venues?.[0]?.city?.name,
						venueState:
							event?._embedded?.venues?.[0]?.state?.stateCode,
						images: event?.images?.[0]?.url,
						ticketMaster: {
							ticketMasterId: event?.id,
							ticketMasterUrl: event?.url,
							ticketMasterPrice: event?.priceRanges?.[0]?.min,
						},
					};
				} else {
					return null;
				}
			})
			.filter(Boolean);

		return newData;
	} catch (error) {
		console.log(error);
	}
};

export const searchTicketMasterPopularEvents = async ({
	location,
}: {
	location?: string;
}) => {
	try {
		const response = await axios.get(`${API_BASE_URL}events.json`, {
			params: {
				apikey: process.env.NEXT_PUBLIC_TICKET_MASTER_KEY,
				geoPoint: location,
			},
		});

		const filteredEvents =
			(await response?.data?._embedded?.events?.filter((event: any) => {
				return typeof event?.priceRanges?.[0]?.min !== "undefined";
			})) || [];

		const newData: EventData[] = await filteredEvents?.map((event: any) => {
			const timezone = event?.dates?.timezone;
			const date = event?.dates?.start?.dateTime;

			const parsedDate = moment.tz(date, timezone);
			const formattedDate = parsedDate.format(
				"ddd MMM Do, YYYY @ h:mm a"
			);

			return {
				name: event?.name,
				date: formattedDate,
				localDate: event?.dates?.start?.localDate,
				timezone: timezone,
				info: event?.info,
				venueName: event?._embedded?.venues?.[0]?.name,
				venueCity: event?._embedded?.venues?.[0]?.city?.name,
				venueState: event?._embedded?.venues?.[0]?.state?.stateCode,
				images: event?.images,
				ticketMaster: {
					ticketMasterId: event?.id,
					ticketMasterUrl: event?.url,
					ticketMasterPrice: event?.priceRanges?.[0]?.min,
				},
			};
		});
		return newData;
	} catch (error) {
		console.log(error);
	}
};

export const searchEventInformation = async ({ id }: { id?: string }) => {
	if (!id) return [];

	try {
		const response = await axios.get(`${API_BASE_URL}/events/${id}.json`, {
			params: {
				apikey: process.env.NEXT_PUBLIC_TICKET_MASTER_KEY,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
