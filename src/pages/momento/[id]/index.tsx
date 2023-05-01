import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	HStack,
	IconButton,
	Image,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { HiTrash } from 'react-icons/hi'
import useSWR from 'swr'

import DeletePostAlertDialog from '~/components/DeletePostAlertDialog'
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

const PostDetailsPage = () => {
	const router = useRouter()
	const { id } = router.query
	const toast = useToast()
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure()

	const handleDeletePost = async () => {
		// TODO: move to api routes
		const { error } = await supabase.from('post').delete().eq('id', id)

		if (error) {
			throw new Error(String(error))
		}

		toast({
			title: 'Momento borrado correctamente',
			status: 'success',
			isClosable: true,
		})
		onDeleteModalClose()
		void router.push('/')
	}
	const { data: post, isLoading } = useSWR(['post', id], fetcher)

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
			<NextSeo title="Ver momento" />
			<HStack justifyContent="end">
				<IconButton
					aria-label="Borrar este momento"
					icon={<HiTrash />}
					colorScheme="red"
					onClick={onDeleteModalOpen}
				/>
				<Link href={`/momento/${post.id}/editar`}>Editar</Link>
			</HStack>
			<Card key={post.id}>
				<CardHeader>
					<Text fontWeight="bold">{post.title}</Text>
				</CardHeader>
				<CardBody>
					<Text>Happened at: {String(new Date(post.happenedAt))}</Text>
					<Image
						src={getStoragePublicUrl(post.pictureName)}
						alt={post.title}
						boxSize="150px"
						objectFit="cover"
					/>
				</CardBody>
				{!!post.description && <CardFooter>{post.description}</CardFooter>}
			</Card>

			{isDeleteModalOpen && (
				<DeletePostAlertDialog
					post={post}
					onDelete={handleDeletePost}
					onClose={onDeleteModalClose}
				/>
			)}
		</>
	)
}

export default PostDetailsPage
