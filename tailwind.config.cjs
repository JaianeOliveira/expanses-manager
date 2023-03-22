/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				slate: {
					850: '#242F42',
				},
			},
		},
	},
	plugins: [],
};
