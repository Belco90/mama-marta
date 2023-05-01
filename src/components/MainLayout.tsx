import { Box, Flex } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	// TODO: load fonts here
	return (
		<Flex height="full" direction="column">
			{/* TODO: NavBar */}
			<Box as="main" flex="1" pb={8}>
				{children}
			</Box>
		</Flex>
	)
}

export default MainLayout
