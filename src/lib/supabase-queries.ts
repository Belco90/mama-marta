import { supabase } from '~/lib/supabase-client'

async function retrieveAllPosts() {
	return supabase.from('post').select('*').order('happenedAt')
}

async function createPost() {
	// 1) upload the file with a UUID as name, including extension
	// 2) insert the new post with "pictureName" manually filled with the previous UUID + ext
	return Promise.resolve(undefined)
}

type AllPostsResponse = Awaited<ReturnType<typeof retrieveAllPosts>>
type Post = NonNullable<AllPostsResponse['data']>[number]

export { retrieveAllPosts, createPost, type Post }
