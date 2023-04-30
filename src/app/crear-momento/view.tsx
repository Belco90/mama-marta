'use client'

import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
	useToast,
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
	const toast = useToast()
	const handleSubmitPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const { picture, ...postData } = Object.fromEntries(formData) as {
			title: string
			description?: string
			happenedAt: string
			picture: File
		}

		const filePath = await uploadPicture(picture)

		await supabase.from('post').insert({ ...postData, pictureName: filePath })

		toast({
			title: 'Nuevo momento creado correctamente',
			status: 'success',
			isClosable: true,
		})
		router.push('/')
	}

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<form onSubmit={handleSubmitPost}>
			<Container>
				<VStack gap={4} alignItems="start">
					<Heading>Crea un nuevo momento</Heading>

					<FormControl isRequired>
						<FormLabel>Foto</FormLabel>
						<Input name="picture" type="file" accept="image/*" />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Título</FormLabel>
						<Input name="title" />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Fecha</FormLabel>
						<Input name="happenedAt" type="date" />
					</FormControl>

					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea name="description" />
					</FormControl>
					<Button type="submit">Crear</Button>
				</VStack>
			</Container>
		</form>
	)
}

export default NewPostView
