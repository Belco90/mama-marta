import { Box, SimpleGrid } from '@chakra-ui/react'

import MemoryGridItem from '~/components/MemoryGridItem'
import { type Memory } from '~/lib/supabase-queries'

interface MemoriesGridProps {
	memories: Array<Memory>
}

const MemoriesGrid = ({ memories }: MemoriesGridProps) => {
	return (
		<SimpleGrid columns={3} spacing={{ base: 1, md: 4 }}>
			{memories.map((memory) => (
				<Box key={memory.id} height={{ base: '120px', md: '300px' }}>
					<MemoryGridItem memory={memory} />
				</Box>
			))}
		</SimpleGrid>
	)
}

export default MemoriesGrid
