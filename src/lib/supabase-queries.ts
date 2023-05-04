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

async function retrieveAllMemories() {
	const { data, error } = await supabase
		.from('memories')
		.select('*')
		.order('happenedAt')

	if (error) {
		throw new Error(error.message)
	}

	return data
}

async function retrieveMemory(id: RequestMemoryParamId) {
	const { data, error } = await supabase
		.from('memories')
		.select('*')
		.eq('id', id)
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function createMemory(formData: RequestFormParams) {
	const { picture, ...postData } = formData
	const filePath = await uploadPicture(picture)

	// TODO: make sure dates are in the correct format

	const { data, error } = await supabase
		.from('memories')
		.insert({ ...postData, pictureName: filePath })
		.select('*')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function updateMemory(
	id: RequestMemoryParamId,
	formData: Omit<RequestFormParams, 'picture'>
) {
	// TODO: make sure dates are in the correct format

	const { data, error } = await supabase
		.from('memories')
		.update(formData)
		.eq('id', id)
		.select('*')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return data
}
async function deleteMemory(id: RequestMemoryParamId) {
	const { error } = await supabase.from('memories').delete().eq('id', id)

	if (error) {
		throw new Error(String(error))
	}

	return id
}

type AllMemoriesResponse = Awaited<ReturnType<typeof retrieveAllMemories>>
type Memory = NonNullable<AllMemoriesResponse>[number]
type RequestMemoryParamId = string
type RequestFormParams = Pick<
	Memory,
	'title' | 'description' | 'happenedAt' | 'pictureMeta'
> & {
	picture: File
}

export {
	retrieveAllMemories,
	createMemory,
	retrieveMemory,
	updateMemory,
	deleteMemory,
	type Memory,
}
