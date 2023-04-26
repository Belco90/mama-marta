import { extendTheme, type Theme } from '@chakra-ui/react'

const themeExtensions = {
	styles: { global: { 'html, body': { height: '100%' } } },
	fonts: {
		heading: 'var(--font-inter)',
		body: 'var(--font-inter)',
		mono: 'var(--font-roboto-mono)',
	},
} satisfies Partial<Theme>

const customTheme = extendTheme(themeExtensions)

export default customTheme
