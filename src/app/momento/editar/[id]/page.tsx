import EditPostPageView from './view'

import { supabase } from '~/lib/supabase-client'

interface EditPostPageProps {
	params: { id: string }
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
	const { id } = params
	const { data } = await supabase.from('post').select('*').eq('id', id).limit(1)
	if (!data || data.length === 0) {
		throw new Error(`Post with id "${id}" not found`)
	}
	const post = data[0]

	return <EditPostPageView post={post} />
}

export default EditPostPage
