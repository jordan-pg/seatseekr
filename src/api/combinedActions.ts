import levenshtein from "fast-levenshtein";
import moment, { Moment } from "moment";
import { EventData, Location } from "@/types/types";
import {
	searchTicketMasterEvents,
	searchTicketMasterPopularEvents,
} from "./ticketmasterActions";
import {
	searchPopularSeatGeekEvents,
	searchSeatGeekEvents,
} from "./seatgeekActions";
import { searchGameTime } from "./gameTimeActions";

// Normalize string for comparison
const normalizeString = (input: string): string => {
	return input.toLowerCase().replace(/[^a-z0-9]+/g, "");
};

// Check if two venue names are similar
const isVenueNameSimilar = (name1: string, name2: string): boolean => {
	const threshold = 3; // Levenshtein distance threshold
	return (
		levenshtein.get(normalizeString(name1), normalizeString(name2)) <=
		threshold
	);
};

// Check if two dates are within a certain difference (e.g., 20 minutes)
const isDateWithinThreshold = (
	date1: string,
	date2: string,
	minutesThreshold: number = 20
): boolean => {
	const format = "ddd MMM Do, YYYY @ h:mm a";
	const moment1: Moment = moment(date1, format);
	const moment2: Moment = moment(date2, format);

	if (!moment1.isValid() || !moment2.isValid()) {
		return false;
	}

	const diffMinutes = Math.abs(moment1.diff(moment2, "minutes"));
	return diffMinutes <= minutesThreshold;
};

// Compare both venue name and date
const isSimilarVenueAndDate = (
	event1: EventData,
	event2: EventData
): boolean => {
	return (
		isVenueNameSimilar(event1.venueName, event2.venueName) &&
		isDateWithinThreshold(event1.date, event2.date)
	);
};

// Utility function to merge two objects without overwriting non-null properties
const mergeProperties = (target: EventData, source: EventData): void => {
	for (const key in source) {
		if (source[key] !== null && source[key] !== undefined) {
			target[key] = source[key];
		}
	}
};

const mergeEvents = (arrays: EventData[][]): EventData[] => {
	const result: EventData[] = [];
	arrays.flat().forEach((item) => {
		let found = false;
		for (let resultItem of result) {
			if (isSimilarVenueAndDate(resultItem, item)) {
				mergeProperties(resultItem, item);
				found = true;
				break;
			}
		}
		if (!found) {
			result.push({ ...item });
		}
	});
	return result;
};

const sortEventsByDate = (events: EventData[]): EventData[] => {
	const format = "ddd MMM Do, YYYY @ h:mm a";
	return events.sort((a, b) => {
		const momentA = moment(a.date, format);
		const momentB = moment(b.date, format);
		return momentA.isBefore(momentB)
			? -1
			: momentA.isAfter(momentB)
			? 1
			: 0;
	});
};

export const searchEvents = async ({
	keyword,
}: {
	keyword: string;
}): Promise<EventData[]> => {
	const ticketMasterData =
		(await searchTicketMasterEvents({ keyword })) ?? [];
	const seatGeekData = (await searchSeatGeekEvents({ keyword })) ?? [];
	const gameTimeData = (await searchGameTime({ keyword })) ?? [];

	console.log({gameTimeData})

	const mergedEvents = mergeEvents([ticketMasterData, seatGeekData, gameTimeData]);

	return sortEventsByDate(mergedEvents);
};

export const searchPopularEvents = async ({
	location,
}: {
	location?: Location;
}): Promise<EventData[]> => {
	let lat = location?.lat;
	let lon = location?.lon;

	if (!lat || !lon) {
		lat = 34.075795;
		lon = -118.281328;
	}

	const ticketMasterData =
		(await searchTicketMasterPopularEvents({
			location: location?.hashLocation,
		})) ?? [];
	const seatGeekData =
		(await searchPopularSeatGeekEvents({ lat, lon })) ?? [];

	const popularEvents = mergeEvents([ticketMasterData, seatGeekData]);

	const limitPopularEvents = popularEvents.slice(0, 6);

	return sortEventsByDate(limitPopularEvents);
};
