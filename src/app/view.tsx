'use client'

import { Link } from '@chakra-ui/next-js'
import {
	Card,
	CardHeader,
	CardBody,
	Text,
	VStack,
	Image,
} from '@chakra-ui/react'
import { type FC } from 'react'

import { type Post } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

interface HomePageViewProps {
	posts: Array<Post>
}

const HomeView: FC<HomePageViewProps> = ({ posts }) => {
	return (
		<VStack width="full">
			<Link href="crear-momento">Crear momento</Link>
			{posts.map((post) => (
				<Card key={post.id}>
					<CardHeader>
						<Text fontWeight="bold">
							<Link href={`momento/detalles/${post.id}`}>{post.title}</Link>
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

export default HomeView
