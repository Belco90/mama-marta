'use client'

import { Box } from '@chakra-ui/react'
import { type FC } from 'react'

import { type Post } from '~/lib/supabase-client'

interface HomePageViewProps {
	posts: Array<Post>
}

const HomePageView: FC<HomePageViewProps> = ({ posts }) => {
	return (
		<Box width="full">
			<pre>{JSON.stringify(posts, null, 2)}</pre>
		</Box>
	)
}

export default HomePageView
