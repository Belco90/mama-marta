import { Box, Container, Flex } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'

import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<Flex height="full" direction="column">
			<NavBar />
			<Box as="main" flex="1 0 auto" pt={6} pb={8}>
				<Container maxWidth="container.lg">{children}</Container>
			</Box>
			<Footer />
		</Flex>
	)
}

export default MainLayout
