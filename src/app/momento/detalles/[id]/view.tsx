'use client'

import { Link } from '@chakra-ui/next-js'
import {
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
import { useRouter } from 'next/navigation'
import { HiTrash } from 'react-icons/hi'

import DeletePostAlertDialog from './DeletePostAlertDialog'

import { supabase } from '~/lib/supabase-client'
import { type Post } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

interface PostDetailsPageViewProps {
	post: Post
}

const PostDetailsPageView = ({ post }: PostDetailsPageViewProps) => {
	const router = useRouter()
	const toast = useToast()
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure()

	const handleDeletePost = async () => {
		const { error } = await supabase.from('post').delete().eq('id', post.id)

		if (error) {
			throw new Error(String(error))
		}

		toast({
			title: 'Momento borrado correctamente',
			status: 'success',
			isClosable: true,
		})
		onDeleteModalClose()
		router.push('/')
	}

	return (
		<>
			<HStack justifyContent="end">
				<IconButton
					aria-label="Borrar este momento"
					icon={<HiTrash />}
					colorScheme="red"
					onClick={onDeleteModalOpen}
				/>
				<Link href={`momento/editar/${post.id}`}>Editar</Link>
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

export default PostDetailsPageView
