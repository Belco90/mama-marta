import PostDetailsPageView from './view'

import { supabase } from '~/lib/supabase-client'

interface PostDetailsPageProps {
	params: { id: string }
}

const PostDetailsPage = async ({ params }: PostDetailsPageProps) => {
	const { id } = params
	const { data } = await supabase.from('post').select('*').eq('id', id).limit(1)
	if (!data) {
		throw new Error(`Post with id "${id}" not found`)
	}
	const post = data[0]

	return <PostDetailsPageView post={post} />
}
export default PostDetailsPage
