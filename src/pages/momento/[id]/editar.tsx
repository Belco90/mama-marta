import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Image,
	Input,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { type FormEvent } from 'react'
import useSWR from 'swr'

import { supabase } from '~/lib/supabase-client'
import { getStoragePublicUrl } from '~/lib/utils'

// TODO: move to api routes
const fetcher = async ([, id]: [string, string]) => {
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

const PostDeletePage = () => {
	const router = useRouter()
	const { id } = router.query
	const toast = useToast()

	const { data: post, isLoading } = useSWR(['post', id], fetcher)

	const handleEditPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const postData = Object.fromEntries(formData) as {
			title: string
			description?: string
			happenedAt: string
		}

		await supabase.from('post').update(postData).eq('id', id)

		toast({
			title: 'Momento actualizado correctamente',
			status: 'success',
			isClosable: true,
		})
		void router.push('/')
	}

	if (typeof id !== 'string') {
		return <Box>No id received</Box>
	}

	if (isLoading) {
		return <Box>LOADING...</Box>
	}

	if (!post) {
		return <Box>No post found for id &quot;{id}&quot;</Box>
	}

	return (
		<>
			<NextSeo title="Editar momento" />
			<form onSubmit={handleEditPost}>
				<Container>
					<VStack gap={4} alignItems="start">
						<Heading>Editar un momento existente</Heading>

						<FormControl>
							<FormLabel>Foto</FormLabel>
							<Image
								src={getStoragePublicUrl(post.pictureName)}
								alt={post.title}
								boxSize="150px"
								objectFit="cover"
							/>
							<FormHelperText>
								La foto no puede ser editada.{' '}
								<Link href={`momento/${post.id}`}>Elimina este momento</Link> y
								crea uno nuevo si quieres cambiarla.
							</FormHelperText>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Título</FormLabel>
							<Input name="title" defaultValue={post.title} />
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Fecha</FormLabel>
							<Input
								name="happenedAt"
								type="date"
								defaultValue={post.happenedAt}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Descripción</FormLabel>
							<Textarea
								name="description"
								defaultValue={post.description ?? ''}
							/>
						</FormControl>
						<Button type="submit">Editar</Button>
					</VStack>
				</Container>
			</form>
		</>
	)
}

export default PostDeletePage
