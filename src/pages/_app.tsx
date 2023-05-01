import { ChakraProvider } from '@chakra-ui/react'
import { type AppProps } from 'next/app'
import { Inter, Roboto_Mono } from 'next/font/google'
import { DefaultSeo, type DefaultSeoProps } from 'next-seo'

import MainLayout from '~/components/MainLayout'
import customTheme from '~/custom-theme'

const DEFAULT_SEO: DefaultSeoProps = {
	titleTemplate: '%s | Mama Marta',
	defaultTitle: 'Mama Marta',
	description: 'Para Marta: la mejor mami 🧡',
	themeColor: customTheme.colors.primary['700'],
	openGraph: {
		type: 'website',
		title: 'Mama Marta',
	},
}
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={`${inter.variable} ${robotoMono.variable}`}>
			<DefaultSeo {...DEFAULT_SEO} />
			<ChakraProvider theme={customTheme}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ChakraProvider>
		</div>
	)
}

export default MyApp
