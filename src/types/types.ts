export interface EventData {
	name?: string;
	date?: string;
	localDate?: string;
	momentDate?: any;
	timezone?: string;
	info?: string;
	venueName?: string;
	venueCity?: string;
	venueState?: string;
	images?: Images[];
	ticketMaster?: TicketMaster;
	seatGeek?: SeatGeek;
}

interface Images {
	url: string;
}

interface SeatGeek {
	seatGeekId?: string;
	seatGeekUrl?: string;
	seatGeekPrice?: number;
}

interface TicketMaster {
	ticketMasterId?: string;
	ticketMasterUrl?: string;
	ticketMasterPrice?: number;
}

export interface Location {
	hashLocation: string;
	lat: number;
	lon: number;
}
