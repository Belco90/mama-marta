import { Image } from '@chakra-ui/next-js'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Text,
} from '@chakra-ui/react'
import { useRef } from 'react'

import { type Memory } from '~/lib/supabase-queries'
import { getPicturePublicUrl } from '~/lib/utils'

interface DeleteMemoryAlertDialogProps {
	memory: Memory
	onClose: () => void
	onDelete: () => void
}

const DeleteMemoryAlertDialog = ({
	memory,
	onDelete,
	onClose,
}: DeleteMemoryAlertDialogProps) => {
	const cancelRef = useRef<HTMLButtonElement | null>(null)

	return (
		<AlertDialog isOpen onClose={onClose} leastDestructiveRef={cancelRef}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Borrar recuerdo
					</AlertDialogHeader>

					<AlertDialogBody>
						¿Estás seguro de que quieres borrar el recuerdo titulado
						<Text as="em">&quot;{memory.title}&quot;</Text> para siempre? Esta
						acción no se puede deshacer.
						<Image
							src={getPicturePublicUrl(memory.pictureName)}
							alt={memory.title}
							width={memory.pictureMeta.width}
							height={memory.pictureMeta.height}
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
							Borrar
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeleteMemoryAlertDialog
