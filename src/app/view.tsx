'use client'

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

const HomePageView: FC<HomePageViewProps> = ({ posts }) => {
	return (
		<VStack width="full">
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

export default HomePageView
