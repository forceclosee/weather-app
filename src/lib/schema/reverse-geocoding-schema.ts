import { z } from "zod";

const localityInfoEntrySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

export const reverseGeocodingSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	city: z.string().optional(),
	locality: z.string().optional(),
	principalSubdivision: z.string().optional(),
	countryName: z.string().optional(),
	countryCode: z.string().optional(),
	localityInfo: z
		.object({
			informative: z.array(localityInfoEntrySchema),
		})
		.optional(),
});

export type ReverseGeocodingResponse = z.infer<typeof reverseGeocodingSchema>;
export type LocalityInfoEntry = z.infer<typeof localityInfoEntrySchema>;
