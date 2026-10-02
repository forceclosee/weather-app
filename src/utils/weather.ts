import { weatherInterpretations } from "#/data/weather-interpretations";

type Params = {
	wmoCode: number | undefined;
	isDay: number | undefined;
};

export const getWeatherDetails = ({ wmoCode, isDay }: Params) => {
	const valid = wmoCode !== undefined && wmoCode in weatherInterpretations;

	const day = isDay === 1;
	const night = isDay === 0;

	// fallback if the wmo code is not on the weather interpretations list or undefined
	const fallback = {
		description: "Unknown weather",
		image:
			"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789653357/unknown_opdlnr.png",
	};

	if (valid && day) {
		return weatherInterpretations[wmoCode].day;
	} else if (valid && night) {
		return weatherInterpretations[wmoCode].night;
	} else {
		return fallback;
	}
};

export const getNamedDirection = (direction: number | undefined) => {
	if (!direction) {
		return "unknown";
	}

	if (direction >= 337.5 || direction < 22.5) {
		return "North";
	} else if (direction >= 22.5 && direction < 67.5) {
		return "North-East";
	} else if (direction >= 67.5 && direction < 112.5) {
		return "East";
	} else if (direction >= 112.5 && direction < 157.5) {
		return "South-East";
	} else if (direction >= 157.5 && direction < 202.5) {
		return "South";
	} else if (direction >= 202.5 && direction < 247.5) {
		return "South-West";
	} else if (direction >= 247.5 && direction < 292.5) {
		return "West";
	} else if (direction >= 292.5 && direction < 337.5) {
		return "North-West";
	} else {
		return "unknown";
	}
};
