import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { type FormEvent, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import PictureImage from '~/components/PictureImage'
import RouteLink from '~/components/RouteLink'
import { retrieveMemory, updateMemory } from '~/lib/supabase-queries'

const EditMemoryPage = () => {
	const router = useRouter()
	const { id } = router.query as { id: string }
	const toast = useToast()
	const { mutate } = useSWRConfig()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { data: memory, isLoading } = useSWR(
		['memory', id],
		([, memoryId]: Array<string>) => retrieveMemory(memoryId)
	)

	const handleEditMemory = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsSubmitting(true)

		const formData = new FormData(event.currentTarget)
		const memoryData = Object.fromEntries(formData) as {
			title: string
			description: string | null
			happenedAt: string
		}
		memoryData.description ||= null

		const updatedMemory = await updateMemory(id, memoryData)
		await mutate(['memory', id], updatedMemory, {
			populateCache: true,
			revalidate: false,
		})

		toast({
			title: 'Recuerdo actualizado correctamente',
			status: 'success',
			isClosable: true,
		})
		void router.push(`/recuerdos/${id}`)
		setIsSubmitting(false)
	}

	if (isLoading) {
		return <Box>LOADING...</Box>
	}

	if (!memory) {
		return <Box>No memory found for id &quot;{id}&quot;</Box>
	}

	return (
		<>
			<NextSeo title="Editar recuerdo" />
			<Heading variant="main">Editar recuerdo</Heading>
			<form onSubmit={handleEditMemory}>
				<VStack gap={4} alignItems="start">
					<FormControl>
						<FormLabel>Foto</FormLabel>
						<PictureImage memory={memory} />
						<FormHelperText>
							La foto no puede ser editada.{' '}
							<RouteLink
								href={`/recuerdos/${memory.id}`}
								textDecoration="underline"
							>
								Elimina este recuerdo
							</RouteLink>{' '}
							y crea uno nuevo si quieres cambiarla.
						</FormHelperText>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Título</FormLabel>
						<Input name="title" defaultValue={memory.title} />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Fecha</FormLabel>
						<Input
							name="happenedAt"
							type="date"
							defaultValue={memory.happenedAt}
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea
							name="description"
							defaultValue={memory.description ?? ''}
						/>
					</FormControl>
					<Button
						type="submit"
						isLoading={isSubmitting}
						loadingText="Cargando..."
					>
						Editar
					</Button>
				</VStack>
			</form>
		</>
	)
}

export default EditMemoryPage
