import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { NextSeo } from 'next-seo'
import { type FormEvent } from 'react'

import MainLayout from '~/components/MainLayout'
import { createPost } from '~/lib/supabase-queries'

const NewPostPage = () => {
	const router = useRouter()
	const toast = useToast()
	const handleSubmitPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const postData = Object.fromEntries(formData) as {
			title: string
			description: string | null
			happenedAt: string
			picture: File
		}
		postData.description ||= null

		await createPost(postData)

		toast({
			title: 'Nuevo momento creado correctamente',
			status: 'success',
			isClosable: true,
		})
		router.push('/')
	}

	return (
		<>
			<NextSeo title="Crear momento" />
			<MainLayout>
				<form onSubmit={handleSubmitPost}>
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
				</form>
			</MainLayout>
		</>
	)
}

export default NewPostPage
