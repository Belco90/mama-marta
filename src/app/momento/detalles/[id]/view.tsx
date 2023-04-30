'use client'

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Image,
	Text,
} from '@chakra-ui/react'

import { type Post } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

interface PostDetailsPageViewProps {
	post: Post
}

const PostDetailsPageView = ({ post }: PostDetailsPageViewProps) => {
	return (
		<Card key={post.id}>
			<CardHeader>
				<Text fontWeight="bold">{post.title}</Text>
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
			{!!post.description && <CardFooter>{post.description}</CardFooter>}
		</Card>
	)
}

export default PostDetailsPageView
