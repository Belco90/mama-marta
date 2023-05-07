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
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiOutlinePower, HiPlus } from 'react-icons/hi2'

import RouteLink from '~/components/RouteLink'
import { useSupabaseClient } from '~/hooks/useSupabaseClient'
import { HOME_URL, LOGIN_URL } from '~/lib/utils'

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
						<RouteLink href={HOME_URL}>
							<Text as="span" color="secondary.700">
								Mamá Marta
							</Text>
						</RouteLink>
					</Box>
					<Spacer />

					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Opciones"
							icon={<GiHamburgerMenu />}
							variant="link"
							colorScheme="secondary"
							fontSize={{ base: 16, md: 20 }}
						/>
						<MenuList>
							<RouteLink href="/recuerdos/crear" legacyBehavior passHref>
								<MenuItem icon={<HiPlus />} as="a">
									Crear recuerdo
								</MenuItem>
							</RouteLink>
							{!!session && (
								<MenuItem icon={<HiOutlinePower />} onClick={handleLogout}>
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
