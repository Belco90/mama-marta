import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Text,
} from '@chakra-ui/react'
import { useRef } from 'react'

import PictureImage from '~/components/PictureImage'
import { type Memory } from '~/lib/supabase-queries'

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
					<AlertDialogCloseButton />

					<AlertDialogBody>
						¿Estás seguro de que quieres borrar este recuerdo para siempre? Esta
						acción <Text as="strong">no se puede deshacer</Text>.
						<Card
							key={memory.id}
							shadow="base"
							borderRadius="0"
							fontFamily="hand"
							mt={4}
						>
							<CardBody
								aspectRatio="1/1"
								overflow="hidden"
								p={{ base: 3, md: 4 }}
							>
								<PictureImage memory={memory} />
							</CardBody>
							<CardHeader pt={0}>
								<Center>
									<Text as="h2" fontWeight="bold" fontSize="2xl">
										<Text as="u">{memory.title}</Text>
									</Text>
								</Center>
							</CardHeader>
						</Card>
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
