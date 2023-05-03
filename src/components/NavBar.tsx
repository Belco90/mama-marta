import {
	Box,
	Text,
	Container,
	Flex,
	HStack,
	Spacer,
	Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSupabaseClient } from '~/hooks/useSupabaseClient'
import { LOGIN_URL } from '~/lib/utils'

const NavBar = () => {
	const router = useRouter()
	const supabase = useSupabaseClient()
	const isHomePage = router.asPath === '/'

	const handleLogout = async () => {
		await supabase.auth.signOut()
		void router.push(LOGIN_URL)
	}

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
							Mama Marta
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
							<Link href="/recuerdo/crear">Crear recuerdo</Link>
						) : (
							<Link href="/">Inicio</Link>
						)}
						<Button size="sm" onClick={handleLogout} variant="ghost">
							Cerrar sesión
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Box>
	)
}

export default NavBar
