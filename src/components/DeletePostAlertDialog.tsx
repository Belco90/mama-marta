import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Image,
	Text,
} from '@chakra-ui/react'
import { useRef } from 'react'

import { type Post } from '~/lib/supabase-queries'
import { getStoragePublicUrl } from '~/lib/utils'

interface DeletePostAlertDialogProps {
	post: Post
	onClose: () => void
	onDelete: () => void
}

const DeletePostAlertDialog = ({
	post,
	onDelete,
	onClose,
}: DeletePostAlertDialogProps) => {
	const cancelRef = useRef<HTMLButtonElement | null>(null)

	return (
		<AlertDialog isOpen onClose={onClose} leastDestructiveRef={cancelRef}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Borrar momento
					</AlertDialogHeader>

					<AlertDialogBody>
						¿Estás seguro de que quieres borrar el momento titulado
						<Text as="em">&quot;{post.title}&quot;</Text> para siempre? Esta
						acción no se puede deshacer.
						<Image
							src={getStoragePublicUrl(post.pictureName)}
							alt={post.title}
							boxSize="150px"
							objectFit="cover"
							mx="auto"
						/>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button
							ref={cancelRef}
							onClick={onClose}
							variant="ghost"
							colorScheme="secondary"
						>
							Cancelar
						</Button>
						<Button onClick={onDelete} colorScheme="red" ml={3}>
							Confirmar
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeletePostAlertDialog
