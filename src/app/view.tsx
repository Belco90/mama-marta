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
						<Text fontWeight="bold">{post.title}</Text>
					</CardHeader>
					<CardBody>
						<Text>Happened at: {String(new Date(post.happenedAt))}</Text>
						<Image
							src={`https://eeogsfrlhsijofrfgiwk.supabase.co/storage/v1/object/public/picture/${post.pictureName}`}
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
