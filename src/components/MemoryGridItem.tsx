import { Box, Text } from '@chakra-ui/react'

import PictureImage from '~/components/PictureImage'
import RouteLink from '~/components/RouteLink'
import { type Memory } from '~/lib/supabase-queries'

interface MemoryGridItemProps {
	memory: Memory
}

const MemoryGridItem = ({ memory }: MemoryGridItemProps) => {
	return (
		<RouteLink href={`/recuerdos/${memory.id}`}>
			<Box as="figure" position="relative" width="full" height="full">
				<PictureImage memory={memory} />
				<Box
					as="figcaption"
					position="absolute"
					bottom={0}
					left={0}
					right={0}
					px={2}
					py={1}
				>
					<Text
						textColor="white"
						fontSize={{ base: '2xs', md: 'md' }}
						noOfLines={1}
						textShadow="0 1px 2px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.3)"
					>
						{memory.title}
					</Text>
				</Box>
			</Box>
		</RouteLink>
	)
}

export default MemoryGridItem
