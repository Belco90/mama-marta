'use client'

import { Card, CardHeader, CardBody, Text, VStack } from '@chakra-ui/react'
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
					<CardHeader>{post.title}</CardHeader>
					<CardBody>
						<Text>Happened at: {String(new Date(post.happenedAt))}</Text>
						<Text>Picture ID: {post.picture}</Text>
					</CardBody>
				</Card>
			))}
		</VStack>
	)
}

export default HomePageView
