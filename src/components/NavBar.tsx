import {
	Box,
	Text,
	Container,
	Flex,
	HStack,
	Show,
	Spacer,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavBar = () => {
	const router = useRouter()

	const isHomePage = router.asPath === '/'

	return (
		<Box as="header" zIndex="banner" shadow="lg" width="full">
			<Container py={2} maxWidth="container.lg">
				<Flex width="full" align="center">
					<Box
						fontWeight="bold"
						fontSize="2xl"
						fontFamily="heading"
						bgGradient={`linear(to-r, primary.500, primary.50)`}
						bgSize="100% 0.2em"
						bgPosition="0 80%"
						bgRepeat="no-repeat"
					>
						<Text as="span" color="secondary.700">
							<Show above="md">Mama Marta</Show> <Show below="md">MM</Show>
						</Text>{' '}
						<span role="img" aria-label="Corazón naranja">
							🧡
						</span>
					</Box>
					<Spacer />

					<HStack
						as="nav"
						spacing={[2, 4]}
						align="center"
						justify="center"
						shouldWrapChildren
					>
						{isHomePage ? (
							<Link href="/crear-momento">Crear momento</Link>
						) : (
							<Link href="/">Inicio</Link>
						)}
					</HStack>
				</Flex>
			</Container>
		</Box>
	)
}

export default NavBar
