import type { Location as InputLocation } from "#/lib/schema/location-schema";

export type Temperature = "celcius" | "fahrenheit";

export type WindSpeed = "kmh" | "mph" | "ms" | "kn";

export type Precipitation = "milimeters" | "inch";

export type Days =
	| "Today"
	| "Tomorrow"
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";

export interface Units {
	temperature: Temperature;
	windSpeed: WindSpeed;
	precipitation: Precipitation;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Locations extends InputLocation {}
