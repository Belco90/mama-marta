import { supabase } from '~/lib/supabase-client'

// TODO: move to api routes
async function retrieveAllPosts() {
	const { data, error } = await supabase
		.from('post')
		.select('*')
		.order('happenedAt')

	if (error) {
		throw new Error(error.message)
	}

	return data
}

type AllPostsResponse = Awaited<ReturnType<typeof retrieveAllPosts>>
type Post = NonNullable<AllPostsResponse>[number]

export { retrieveAllPosts, type Post }
