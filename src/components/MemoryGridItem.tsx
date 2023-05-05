import { Image } from '@chakra-ui/react'

import RouteLink from '~/components/RouteLink'
import { type Memory } from '~/lib/supabase-queries'
import { getPicturePublicUrl } from '~/lib/utils'

interface MemoryGridItemProps {
	memory: Memory
}

const MemoryGridItem = ({ memory }: MemoryGridItemProps) => {
	return (
		<RouteLink href={`/recuerdos/${memory.id}`}>
			<Image
				src={getPicturePublicUrl(memory.pictureName)}
				alt={memory.title}
				width="full"
				height="full"
				objectFit="cover"
			/>
		</RouteLink>
	)
}

export default MemoryGridItem
