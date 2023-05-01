'use client'

import { Link } from '@chakra-ui/next-js'
import {
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
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'

import { supabase } from '~/lib/supabase-client'
import { type Post } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

interface EditPostPageViewProps {
	post: Post
}

const EditPostPageView = ({ post }: EditPostPageViewProps) => {
	const router = useRouter()
	const toast = useToast()

	const handleEditPost = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const postData = Object.fromEntries(formData) as {
			title: string
			description?: string
			happenedAt: string
		}

		await supabase.from('post').update(postData).eq('id', post.id)

		toast({
			title: 'Momento actualizado correctamente',
			status: 'success',
			isClosable: true,
		})
		router.push('/')
	}
	return (
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
							<Link href={`momento/detalles/${post.id}`}>
								Elimina este momento
							</Link>{' '}
							y crea uno nuevo si quieres cambiarla.
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
	)
}

export default EditPostPageView
