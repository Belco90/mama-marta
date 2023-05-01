import {
	type ColorHues,
	extendTheme,
	type Theme,
	withDefaultColorScheme,
} from '@chakra-ui/react'
import { Inter, Roboto_Mono } from 'next/font/google'

type ExtendedTheme = Theme & {
	colors: { primary: ColorHues; secondary: ColorHues; accent: ColorHues }
}

const primaryColor: ColorHues = {
	50: '#ffe6f9',
	100: '#f6bde3',
	200: '#ed92cd',
	300: '#e468b9',
	400: '#db3da5',
	500: '#c2258b',
	600: '#971b6c',
	700: '#6d114d',
	800: '#43092f',
	900: '#1c0012',
}

const secondaryColor: ColorHues = {
	50: '#dcf9ff',
	100: '#b2e8fd',
	200: '#86d7f7',
	300: '#58c7f3',
	400: '#30b7ef',
	500: '#1b9ed5',
	600: '#0c7ba7',
	700: '#015878',
	800: '#00364a',
	900: '#00141d',
}

const accentColor: ColorHues = {
	50: '#fff9dc',
	100: '#fcedb1',
	200: '#f8e183',
	300: '#f5d554',
	400: '#f2ca26',
	500: '#d9b00d',
	600: '#a98906',
	700: '#796201',
	800: '#493b00',
	900: '#1a1400',
}

const interFont = Inter({
	subsets: ['latin'],
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
})

const themeExtensions = {
	styles: { global: { 'html, body, #__next': { height: '100%' } } },
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false,
	},
	colors: {
		primary: primaryColor,
		secondary: secondaryColor,
		accent: accentColor,
		pink: primaryColor,
		blue: secondaryColor,
		yellow: accentColor,
	},
	fonts: {
		heading: interFont.style.fontFamily,
		body: interFont.style.fontFamily,
		mono: robotoMonoFont.style.fontFamily,
	},
}

const customTheme = extendTheme(
	themeExtensions,
	withDefaultColorScheme({ colorScheme: 'primary' })
) as ExtendedTheme

export default customTheme
