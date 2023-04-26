import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Mama Marta',
	description: 'Para Marta: la mejor mami 🧡',
	robots: {
		index: false,
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="es">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
