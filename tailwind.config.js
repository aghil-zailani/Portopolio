export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
				soft: 'rgb(var(--color-soft) / <alpha-value>)',
				paper: 'rgb(var(--color-paper) / <alpha-value>)',
				ink: 'rgb(var(--color-ink) / <alpha-value>)',
				night: 'rgb(var(--color-night) / <alpha-value>)',
				accent: 'rgb(var(--color-accent) / <alpha-value>)',
				coral: 'rgb(var(--color-coral) / <alpha-value>)',
				muted: 'rgb(var(--color-muted) / <alpha-value>)',
				line: 'rgb(var(--color-line))',
			},
			fontFamily: {
				display: ['Barlow Condensed', 'sans-serif'],
				body: ['DM Sans', 'sans-serif'],
				mono: ['DM Mono', 'monospace'],
				hand: ['Caveat', 'cursive'],
			},
		},
	},
	plugins: [],
};
