import { Box, Container, Link, Text } from '@chakra-ui/react'

const Footer = () => {
	return (
		<Box
			as="footer"
			textColor="secondary.700"
			fontWeight="bold"
			boxShadow="base"
		>
			<Container
				centerContent
				maxWidth="container.lg"
				py={{ base: 1, lg: 4 }}
				px={{ base: 4, lg: 5 }}
			>
				<Text as="span" textAlign="center">
					Creado por{' '}
					<Link href="https://mario.dev/" isExternal>
						Mario
					</Link>
				</Text>
			</Container>
		</Box>
	)
}

export default Footer
