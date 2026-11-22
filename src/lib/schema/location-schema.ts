import z from "zod";

export const locationSchema = z.object({
	coordinates: z.object({
		latitude: z.number(),
		longitude: z.number(),
	}),
	timezone: z.string(),
	city: z.string(),
	province: z.string(),
	country: z.string(),
	countryCode: z.string().toLowerCase(),
});

export type Location = z.infer<typeof locationSchema>;
export type LocationInput = z.input<typeof locationSchema>;
