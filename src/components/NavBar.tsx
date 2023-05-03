import {
	Box,
	Container,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Text,
} from '@chakra-ui/react'
import { useSession } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiOutlineHome, HiPlus, HiPower } from 'react-icons/hi2'

import { useSupabaseClient } from '~/hooks/useSupabaseClient'
import { LOGIN_URL } from '~/lib/utils'

const NavBar = () => {
	const router = useRouter()
	const supabase = useSupabaseClient()
	const session = useSession()

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

					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Opciones"
							icon={<GiHamburgerMenu />}
							variant="outline"
						/>
						<MenuList>
							<Link href="/" legacyBehavior passHref>
								<MenuItem icon={<HiOutlineHome />} as="a">
									Inicio
								</MenuItem>
							</Link>
							<Link href="/recuerdo/crear" legacyBehavior passHref>
								<MenuItem icon={<HiPlus />} as="a">
									Crear recuerdo
								</MenuItem>
							</Link>
							{!!session && (
								<MenuItem icon={<HiPower />} onClick={handleLogout}>
									Cerrar sesión
								</MenuItem>
							)}
						</MenuList>
					</Menu>
				</Flex>
			</Container>
		</Box>
	)
}

export default NavBar
