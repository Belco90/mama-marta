'use client'

import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'
import { v4 as uuid } from 'uuid'

import { supabase } from '~/lib/supabase-client'

const uploadPicture = async (file: File) => {
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

const NewPostView = () => {
	const router = useRouter()
	const handleSubmitPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const formData = new FormData(event.target)
		const { picture, ...postData } = Object.fromEntries(formData) as {
			title: string
			description?: string
			happenedAt: string
			picture: File
		}

		const filePath = await uploadPicture(picture)

		await supabase.from('post').insert({ ...postData, pictureName: filePath })

		router.push('/')
	}

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<form onSubmit={handleSubmitPost}>
			<Container>
				<VStack gap={4} alignItems="start">
					<Heading>Crea un nuevo momento</Heading>

					<FormControl isRequired>
						<FormLabel>Título</FormLabel>
						<Input name="title" />
					</FormControl>

					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea name="description" />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Fecha</FormLabel>
						<Input name="happenedAt" type="date" />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Foto</FormLabel>
						<Input name="picture" type="file" accept="image/*" />
					</FormControl>

					<Button type="submit">Crear</Button>
				</VStack>
			</Container>
		</form>
	)
}

export default NewPostView
