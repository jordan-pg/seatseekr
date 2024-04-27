import moment from "moment";
import { EventData, Location } from "@/types/types";
import {
	searchPopularSeatGeekEvents,
	searchSeatGeekEvents,
} from "@/api/seatgeekActions";
import {
	searchTicketMasterEvents,
	searchTicketMasterPopularEvents,
} from "@/api/ticketmasterActions";

export const searchEvents = async ({ keyword }: { keyword: string }) => {
	try {
		const ticketMasterData = await searchTicketMasterEvents({ keyword });
		const seatGeekData = await searchSeatGeekEvents({ keyword });

		const events: EventData[] = [];

		ticketMasterData?.forEach((ticketMasterEvent: EventData) => {
			const matchingSeatGeekEvent = seatGeekData?.find(
				(seatGeekEvent) => {
					const seatGeekVenue = seatGeekEvent?.venueName?.substring(
						0,
						3
					);
					const ticketMasterVenue =
						ticketMasterEvent?.venueName?.substring(0, 3);
					const parsedDate1 = moment(
						seatGeekEvent?.date,
						"ddd MMM Do, YYYY @ h:mm a"
					);
					const parsedDate2 = moment(
						ticketMasterEvent?.date,
						"ddd MMM Do, YYYY @ h:mm a"
					);

					const seatGeekDate = parsedDate1.clone().startOf("hour");
					const ticketMasterDate = parsedDate2
						.clone()
						.startOf("hour");

					return (
						seatGeekVenue === ticketMasterVenue &&
						seatGeekDate.isSame(ticketMasterDate)
					);
				}
			);

			if (matchingSeatGeekEvent) {
				const modifiedTicketMasterEvent: EventData = {
					...ticketMasterEvent,
					seatGeek: {
						seatGeekId: matchingSeatGeekEvent?.seatGeek?.seatGeekId,
						seatGeekUrl:
							matchingSeatGeekEvent?.seatGeek?.seatGeekUrl,
						seatGeekPrice:
							matchingSeatGeekEvent?.seatGeek?.seatGeekPrice,
					},
				};
				events.push(modifiedTicketMasterEvent);
			} else {
				events.push(ticketMasterEvent);
			}
		});

		seatGeekData?.forEach((seatGeekEvent: EventData) => {
			const matchingTicketMasterEvent = ticketMasterData?.find(
				(ticketMasterEvent) => {
					const seatGeekVenue = seatGeekEvent?.venueName?.substring(
						0,
						3
					);
					const ticketMasterVenue =
						ticketMasterEvent?.venueName?.substring(0, 3);
					const seatGeekDate = seatGeekEvent?.date?.substring(0, 12);
					const ticketMasterDate = ticketMasterEvent?.date?.substring(
						0,
						12
					);

					return (
						seatGeekVenue === ticketMasterVenue &&
						seatGeekDate === ticketMasterDate
					);
				}
			);

			if (!matchingTicketMasterEvent) {
				events.push(seatGeekEvent);
			}
		});

		events.forEach((obj) => {
			obj.momentDate = moment(obj.date, "ddd MMM Do, YYYY @ h:mm a");
		});
		events.sort((a, b) => a.momentDate.diff(b.momentDate));
		events.forEach((obj) => {
			delete obj.momentDate;
		});

		return events;
	} catch (error) {
		console.error("Error in searchEvents:", error);
		return [];
	}
};

export const searchPopularEvents = async ({
	location,
}: {
	location?: Location;
}) => {
	const events: EventData[] = [];

	try {
		let lat = location?.lat;
		let lon = location?.lon;

		if (!lat || !lon) {
			lat = 34.075795;
			lon = -118.281328;
		}

		const ticketMasterData = await searchTicketMasterPopularEvents({
			location: location?.hashLocation,
		});
		const seatGeekData = await searchPopularSeatGeekEvents({
			lat,
			lon,
		});

		ticketMasterData?.forEach((ticketMasterEvent: EventData) => {
			const matchingSeatGeekEvent = seatGeekData?.find(
				(seatGeekEvent) => {
					const seatGeekVenue = seatGeekEvent?.venueName?.substring(
						0,
						3
					);
					const ticketMasterVenue =
						ticketMasterEvent?.venueName?.substring(0, 3);
					const parsedDate1 = moment(
						seatGeekEvent?.date,
						"ddd MMM Do, YYYY @ h:mm a"
					);
					const parsedDate2 = moment(
						ticketMasterEvent?.date,
						"ddd MMM Do, YYYY @ h:mm a"
					);

					const seatGeekDate = parsedDate1.clone().startOf("hour");
					const ticketMasterDate = parsedDate2
						.clone()
						.startOf("hour");

					return (
						seatGeekVenue === ticketMasterVenue &&
						seatGeekDate.isSame(ticketMasterDate)
					);
				}
			);

			if (matchingSeatGeekEvent) {
				const modifiedTicketMasterEvent: EventData = {
					...ticketMasterEvent,
					seatGeek: {
						seatGeekId: matchingSeatGeekEvent?.seatGeek?.seatGeekId,
						seatGeekUrl:
							matchingSeatGeekEvent?.seatGeek?.seatGeekUrl,
						seatGeekPrice:
							matchingSeatGeekEvent?.seatGeek?.seatGeekPrice,
					},
				};
				events.push(modifiedTicketMasterEvent);
			} else {
				events.push(ticketMasterEvent);
			}
		});

		seatGeekData?.forEach((seatGeekEvent: EventData) => {
			const matchingTicketMasterEvent = ticketMasterData?.find(
				(ticketMasterEvent) => {
					const seatGeekVenue = seatGeekEvent?.venueName?.substring(
						0,
						3
					);
					const ticketMasterVenue =
						ticketMasterEvent?.venueName?.substring(0, 3);
					const seatGeekDate = seatGeekEvent?.date?.substring(0, 12);
					const ticketMasterDate = ticketMasterEvent?.date?.substring(
						0,
						12
					);

					return (
						seatGeekVenue === ticketMasterVenue &&
						seatGeekDate === ticketMasterDate
					);
				}
			);

			if (!matchingTicketMasterEvent) {
				events.push(seatGeekEvent);
			}
		});

		events.forEach((obj) => {
			obj.momentDate = moment(obj.date, "ddd MMM Do, YYYY @ h:mm a");
		});
		events.sort((a, b) => a.momentDate.diff(b.momentDate));
		events.forEach((obj) => {
			delete obj.momentDate;
		});

		return events?.slice(0, 6);
	} catch (error) {
		console.error("Error in searchEvents:", error);
		return [];
	}
};
