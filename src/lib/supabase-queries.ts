import { supabase } from '~/lib/supabase-client'

async function retrieveAllPosts() {
	return supabase.from('Post').select('*').order('happenedAt')
}

type AllPostsResponse = Awaited<ReturnType<typeof retrieveAllPosts>>
type Post = NonNullable<AllPostsResponse['data']>[number]

export { retrieveAllPosts, type Post }
