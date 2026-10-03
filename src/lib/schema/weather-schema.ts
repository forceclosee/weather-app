import { z } from "zod";

export const weatherSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	generationtime_ms: z.number(),
	utc_offset_seconds: z.number(),
	timezone: z.string(),
	timezone_abbreviation: z.string(),
	elevation: z.number(),
	current_units: z.object({
		time: z.string(),
		interval: z.string(),
		temperature_2m: z.string(),
		weather_code: z.string(),
		apparent_temperature: z.string(),
		relative_humidity_2m: z.string(),
		wind_speed_10m: z.string(),
		is_day: z.string(),
		precipitation: z.string(),
		wind_direction_10m: z.string(),
	}),
	current: z.object({
		time: z.string(),
		interval: z.number(),
		temperature_2m: z.number(),
		weather_code: z.number(),
		apparent_temperature: z.number(),
		relative_humidity_2m: z.number(),
		wind_speed_10m: z.number(),
		is_day: z.number(),
		precipitation: z.number(),
		wind_direction_10m: z.number(),
	}),
	hourly_units: z.object({
		time: z.string(),
		temperature_2m: z.string(),
		weather_code: z.string(),
	}),
	hourly: z.object({
		time: z.array(z.string()),
		temperature_2m: z.array(z.number()),
		weather_code: z.array(z.number()),
	}),
	daily_units: z.object({
		time: z.string(),
		weather_code: z.string(),
		temperature_2m_max: z.string(),
		temperature_2m_min: z.string(),
	}),
	daily: z.object({
		time: z.array(z.string()),
		weather_code: z.array(z.number()),
		temperature_2m_max: z.array(z.number()),
		temperature_2m_min: z.array(z.number()),
	}),
});

export type WeatherResponse = z.infer<typeof weatherSchema>;
