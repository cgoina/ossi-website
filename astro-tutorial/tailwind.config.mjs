/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  colors: {
			primary: 'var(--aw-color-primary)',
			secondary: 'var(--aw-color-secondary)',
			accent: 'var(--aw-color-accent)',
			default: 'var(--aw-color-text-default)',
			muted: 'var(--aw-color-text-muted)',
		  },
		  fontFamily: {
			sans: ['var(--aw-font-sans)', ...defaultTheme.fontFamily.sans],
			serif: ['var(--aw-font-serif)', ...defaultTheme.fontFamily.serif],
			heading: ['var(--aw-font-heading)', ...defaultTheme.fontFamily.sans],
		  },
		  backgroundImage: {
			'hero-pattern':"url('/src/assets/images/hero.jpg')"
		  }
		},
	  },
	  plugins: [require('@tailwindcss/typography')],
	  darkMode: 'class',
}