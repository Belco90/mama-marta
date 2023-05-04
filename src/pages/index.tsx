import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react'
import useSWR from 'swr'

import RouteLink from '~/components/RouteLink'
import { retrieveAllMemories } from '~/lib/supabase-queries'
import { getPicturePublicUrl } from '~/lib/utils'

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
			<VStack>
				{memories.map((memory) => (
					<Card key={memory.id} width="full">
						<CardHeader>
							<Text fontWeight="bold">
								<RouteLink href={`/recuerdo/${memory.id}`}>
									{memory.title}
								</RouteLink>
							</Text>
						</CardHeader>
						<CardBody>
							<Text>Happened at: {String(new Date(memory.happenedAt))}</Text>
							<Image
								src={getPicturePublicUrl(memory.pictureName)}
								alt={memory.title}
								boxSize="150px"
								objectFit="cover"
							/>
						</CardBody>
					</Card>
				))}
			</VStack>
		</>
	)
}

export default HomePage
