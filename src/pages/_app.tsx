import { ChakraProvider } from '@chakra-ui/react'
import { type AppProps } from 'next/app'
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

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...DEFAULT_SEO} />
			<ChakraProvider theme={customTheme}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ChakraProvider>
		</>
	)
}

export default MyApp
