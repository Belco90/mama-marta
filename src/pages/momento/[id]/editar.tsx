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

import { retrievePost, updatePost } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

const PostDeletePage = () => {
	const router = useRouter()
	const { id } = router.query as { id: string }
	const toast = useToast()

	const { data: post, isLoading } = useSWR(
		['post', id],
		([, postId]: Array<string>) => retrievePost(postId)
	)

	const handleEditPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const postData = Object.fromEntries(formData) as {
			title: string
			description: string | null
			happenedAt: string
		}
		postData.description ||= null

		// TODO: use SWR mutation
		await updatePost(id, postData)

		toast({
			title: 'Momento actualizado correctamente',
			status: 'success',
			isClosable: true,
		})
		void router.push('/')
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
