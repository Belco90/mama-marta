import { ChakraProvider } from '@chakra-ui/react'
import {
	type Session,
	SessionContextProvider,
} from '@supabase/auth-helpers-react'
import { type AppProps } from 'next/app'
import { Inter, Roboto_Mono } from 'next/font/google'
import { DefaultSeo, type DefaultSeoProps } from 'next-seo'
import { useState } from 'react'

import MainLayout from '~/components/MainLayout'
import customTheme from '~/custom-theme'
import { supabase } from '~/lib/supabase-client'

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

const interFont = Inter({
	subsets: ['latin'],
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
})

function MyApp({
	Component,
	pageProps,
}: AppProps<{ initialSession: Session }>) {
	const [supabaseClient] = useState(supabase)

	return (
		<>
			<style jsx global>{`
				:root {
					--font-inter: ${interFont.style.fontFamily};
					--font-roboto-mono: ${robotoMonoFont.style.fontFamily};
				}
			`}</style>
			<DefaultSeo {...DEFAULT_SEO} />
			<ChakraProvider theme={customTheme}>
				<SessionContextProvider
					supabaseClient={supabaseClient}
					initialSession={pageProps.initialSession}
				>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</SessionContextProvider>
			</ChakraProvider>
		</>
	)
}

export default MyApp
