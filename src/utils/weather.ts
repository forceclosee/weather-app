import { weatherInterpretations } from "#/data/weather-interpretations";

type Params = {
	wmoCode: number | undefined;
	isDay: number | undefined;
};

export const getWeatherDetails = ({ wmoCode, isDay }: Params) => {
	// fallback if the wmo code is not on the weather interpretations list or undefined (scenario that should never happen, just in case)

	const day = isDay === 1;
	const night = isDay === 0;

	const fallback = {
		description: "Unknown weather",
		image:
			"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789653357/unknown_opdlnr.png",
	};

	if (wmoCode !== undefined && day && wmoCode in weatherInterpretations) {
		return weatherInterpretations[wmoCode].day;
	} else if (
		wmoCode !== undefined &&
		night &&
		wmoCode in weatherInterpretations
	) {
		return weatherInterpretations[wmoCode].night;
	} else {
		return fallback;
	}
};
