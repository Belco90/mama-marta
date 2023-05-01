import { v4 as uuid } from 'uuid'

import { supabase } from '~/lib/supabase-client'

async function uploadPicture(file: File) {
	const fileExt = file.name.split('.').at(-1) ?? 'jpg'
	const fileName = uuid()
	const filePath = `${fileName}.${fileExt}`

	const { error } = await supabase.storage
		.from('picture')
		.upload(filePath, file)

	if (error) {
		throw error
	}

	return filePath
}

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

async function retrievePost(id: PostRequestId) {
	const { data, error } = await supabase
		.from('post')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function createPost(formData: PostRequestData) {
	const { picture, ...postData } = formData
	const filePath = await uploadPicture(picture)

	const { data, error } = await supabase
		.from('post')
		.insert({ ...postData, pictureName: filePath })
		.select('*')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function updatePost(
	id: PostRequestId,
	formData: Omit<PostRequestData, 'picture'>
) {
	const { data, error } = await supabase
		.from('post')
		.update(formData)
		.eq('id', id)
		.select('*')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function deletePost(id: PostRequestId) {
	const { error } = await supabase.from('post').delete().eq('id', id)

	if (error) {
		throw new Error(String(error))
	}

	return id
}

type AllPostsResponse = Awaited<ReturnType<typeof retrieveAllPosts>>
type Post = NonNullable<AllPostsResponse>[number]
type PostRequestId = string
type PostRequestData = Pick<Post, 'title' | 'description' | 'happenedAt'> & {
	picture: File
}

export {
	retrieveAllPosts,
	createPost,
	retrievePost,
	updatePost,
	deletePost,
	type Post,
}
