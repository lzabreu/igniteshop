/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			'Grayscale/White': '#ffffff',
			'Grayscale/Title': '#e1e1e6',
			'Grayscale/Text': '#c4c4cc',
			'Grayscale/Elements': '#202024',
			'Grayscale/Background': '#121214',
			'Brand/Light': '#00b37e',
			'Brand/Principal': '#00875f',
		},
		extend: {
			backgroundImage: {
				backGradient:
					'linear-gradient(180deg, #1EA483 0%, #359299 27.16%, #4388A6 43.49%, #7465D4 100%)',
			},
		},
		plugins: [require('daisyui')],
	},
}
