import { Box, Heading } from '@chakra-ui/react'
import useSWR from 'swr'

import MemoriesGrid from '~/components/MemoriesGrid'
import { retrieveAllMemories } from '~/lib/supabase-queries'

const HomePage = () => {
	const { data: memories, isLoading } = useSWR(
		'all-memories',
		retrieveAllMemories
	)

	if (isLoading) {
		return <Box>LOADING...</Box>
	}

	if (!memories || memories.length === 0) {
		return <Box>EMPTY</Box>
	}

	return (
		<>
			<Heading variant="main">Mis recuerdos</Heading>

			<Box mx={{ base: -4, md: 'inherit' }}>
				<MemoriesGrid memories={memories} />
			</Box>
		</>
	)
}

export default HomePage
