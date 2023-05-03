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

import { createMemory } from '~/lib/supabase-queries'

const CreateMemoryPage = () => {
	const router = useRouter()
	const toast = useToast()
	const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const memoryData = Object.fromEntries(formData) as {
			title: string
			description: string | null
			happenedAt: string
			picture: File
		}
		memoryData.description ||= null

		await createMemory(memoryData)

		toast({
			title: 'Nuevo recuerdo creado correctamente',
			status: 'success',
			isClosable: true,
		})
		router.push('/')
	}

	return (
		<>
			<NextSeo title="Crear recuerdo" />
			<Heading variant="main">Crea un nuevo recuerdo</Heading>
			<form onSubmit={handleCreateMemory}>
				<VStack gap={4} alignItems="start">
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
		</>
	)
}

export default CreateMemoryPage
