export interface EventData {
	name?: string;
	date: string;
	localDate?: string;
	momentDate?: any;
	timezone?: string;
	info?: string;
	venueName: string;
	venueCity?: string;
	venueState?: string;
	images?: string;
	ticketMaster?: TicketMaster;
	seatGeek?: SeatGeek;
	gameTime?: GameTime;
	[key: string]: any; 
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

interface GameTime {
	gameTimeId?: string;
	gameTimeUrl?: string;
	gameTimePrice?: number;
}

export interface Location {
	hashLocation: string;
	lat: number;
	lon: number;
}
