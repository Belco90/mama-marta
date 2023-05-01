import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import useSWR from 'swr'

import { retrieveAllPosts } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

const HomePage = () => {
	const { data: posts, isLoading } = useSWR('all-posts', retrieveAllPosts)

	if (isLoading) {
		return <Box>LOADING...</Box>
	}

	if (!posts || posts.length === 0) {
		return <Box>EMPTY</Box>
	}

	return (
		<VStack width="full">
			<Link href="/crear-momento">Crear momento</Link>
			{posts.map((post) => (
				<Card key={post.id}>
					<CardHeader>
						<Text fontWeight="bold">
							<Link href={`/momento/${post.id}`}>{post.title}</Link>
						</Text>
					</CardHeader>
					<CardBody>
						<Text>Happened at: {String(new Date(post.happenedAt))}</Text>
						<Image
							src={getStoragePublicUrl(post.pictureName)}
							alt={post.title}
							boxSize="150px"
							objectFit="cover"
						/>
					</CardBody>
				</Card>
			))}
		</VStack>
	)
}

export default HomePage
