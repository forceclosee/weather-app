import { z } from "zod";

// Schema untuk setiap objek lokasi di dalam array "results"
const locationSchema = z.object({
	id: z.number(),
	name: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	elevation: z.number(),
	feature_code: z.string(),
	country_code: z.string(),
	timezone: z.string(),
	population: z.number().optional(),
	postcodes: z.array(z.string()).optional(),
	country_id: z.number(),
	country: z.string(),
	admin1_id: z.number(),
	admin1: z.string(),

	admin2_id: z.number().optional(),
	admin2: z.string().optional(),
	admin3_id: z.number().optional(),
	admin3: z.string().optional(),
	admin4_id: z.number().optional(),
	admin4: z.string().optional(),
});

export const geocodingSchema = z.object({
	results: z.array(locationSchema),
	generationtime_ms: z.number(),
});

export type GeocodingResponse = z.infer<typeof geocodingSchema>;
export type Location = z.infer<typeof locationSchema>;
