import { Inter, Roboto_Mono } from 'next/font/google'
import { type ReactNode } from 'react'

import Providers from '~/app/providers'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

export const metadata = {
	title: 'Mama Marta',
	description: 'Para Marta: la mejor mami 🧡',
	robots: {
		index: false,
	},
}

export const revalidate = 0

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
