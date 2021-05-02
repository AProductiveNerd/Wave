const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: [
		"./src/**/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"blue-waves": "url('/images/blue-waves.jpg')",
			}),
			colors: {
				emerald: colors.emerald,
				theme: {
					primary: "#155E75",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
