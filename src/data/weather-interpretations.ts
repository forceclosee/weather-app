type WeatherInterpretations = Record<
	number,
	Record<string, { description: string; image: string }>
>;

export const weatherInterpretations: WeatherInterpretations = {
	0: {
		day: {
			description: "Sunny",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/01d_mb78nl.svg",
		},
		night: {
			description: "Clear",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/01n_oprjbx.svg",
		},
	},
	1: {
		day: {
			description: "Mainly Sunny",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/01d_mb78nl.svg",
		},
		night: {
			description: "Mainly Clear",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/01n_oprjbx.svg",
		},
	},
	2: {
		day: {
			description: "Partly Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/02d_mq4g8w.svg",
		},
		night: {
			description: "Partly Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/02n_dnyx82.svg",
		},
	},
	3: {
		day: {
			description: "Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/03_du4uao.svg",
		},
		night: {
			description: "Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/03_du4uao.svg",
		},
	},
	45: {
		day: {
			description: "Foggy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/50_krrjso.svg",
		},
		night: {
			description: "Foggy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/50_krrjso.svg",
		},
	},
	48: {
		day: {
			description: "Rime Fog",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/50_krrjso.svg",
		},
		night: {
			description: "Rime Fog",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/50_krrjso.svg",
		},
	},
	51: {
		day: {
			description: "Light Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Light Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	53: {
		day: {
			description: "Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	55: {
		day: {
			description: "Heavy Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Heavy Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	56: {
		day: {
			description: "Light Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Light Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	57: {
		day: {
			description: "Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	61: {
		day: {
			description: "Light Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10d_awjn0w.svg",
		},
		night: {
			description: "Light Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10n_jvefqd.svg",
		},
	},
	63: {
		day: {
			description: "Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10d_awjn0w.svg",
		},
		night: {
			description: "Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10n_jvefqd.svg",
		},
	},
	65: {
		day: {
			description: "Heavy Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10d_awjn0w.svg",
		},
		night: {
			description: "Heavy Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10n_jvefqd.svg",
		},
	},
	66: {
		day: {
			description: "Light Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10d_awjn0w.svg",
		},
		night: {
			description: "Light Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10n_jvefqd.svg",
		},
	},
	67: {
		day: {
			description: "Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10d_awjn0w.svg",
		},
		night: {
			description: "Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/10n_jvefqd.svg",
		},
	},
	71: {
		day: {
			description: "Light Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Light Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	73: {
		day: {
			description: "Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	75: {
		day: {
			description: "Heavy Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Heavy Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	77: {
		day: {
			description: "Snow Grains",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Snow Grains",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	80: {
		day: {
			description: "Light Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Light Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	81: {
		day: {
			description: "Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	82: {
		day: {
			description: "Heavy Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
		night: {
			description: "Heavy Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523883/09_gh7wut.svg",
		},
	},
	85: {
		day: {
			description: "Light Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Light Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	86: {
		day: {
			description: "Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
		night: {
			description: "Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/13_dzsxrj.svg",
		},
	},
	95: {
		day: {
			description: "Thunderstorm",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
		night: {
			description: "Thunderstorm",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
	},
	96: {
		day: {
			description: "Light Thunderstorms With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
		night: {
			description: "Light Thunderstorms With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
	},
	99: {
		day: {
			description: "Thunderstorm With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
		night: {
			description: "Thunderstorm With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1791523885/11_cer47a.svg",
		},
	},
};
