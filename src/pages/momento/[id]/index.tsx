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
import { deletePost, retrievePost } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

const PostDetailsPage = () => {
	const router = useRouter()
	const { id } = router.query as { id: string }
	const toast = useToast()
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure()

	const handleDeletePost = async () => {
		// TODO: use SWR mutation
		await deletePost(id)

		toast({
			title: 'Momento borrado correctamente',
			status: 'success',
			isClosable: true,
		})
		onDeleteModalClose()
		void router.push('/')
	}
	const { data: post, isLoading } = useSWR(
		['post', id],
		([, postId]: Array<string>) => retrievePost(postId)
	)

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
