import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
	return (
		<Html lang="es">
			<Head>
				<meta name="robots" content="noindex" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
