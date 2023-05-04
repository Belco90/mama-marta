import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { HiTrash } from 'react-icons/hi'
import useSWR from 'swr'

import DeleteMemoryAlertDialog from '~/components/DeleteMemoryAlertDialog'
import RouteLink from '~/components/RouteLink'
import { deleteMemory, retrieveMemory } from '~/lib/supabase-queries'
import { getPicturePublicUrl } from '~/lib/utils'

const DetailsMemoryPage = () => {
	const router = useRouter()
	const { id } = router.query as { id: string }
	const toast = useToast()
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure()

	const handleDeleteMemory = async () => {
		await deleteMemory(id)

		toast({
			title: 'Recuerdo borrado correctamente',
			status: 'success',
			isClosable: true,
		})
		onDeleteModalClose()
		void router.push('/')
	}
	const { data: memory, isLoading } = useSWR(
		['memory', id],
		([, memoryId]: Array<string>) => retrieveMemory(memoryId)
	)

	if (isLoading) {
		return <Box>LOADING...</Box>
	}

	if (!memory) {
		return <Box>No memory found for id &quot;{id}&quot;</Box>
	}

	return (
		<>
			<NextSeo title="Ver recuerdo" />
			<>
				<Heading variant="main">Un recuerdo...</Heading>
				<HStack justifyContent="end">
					<IconButton
						aria-label="Borrar este recuerdo"
						icon={<HiTrash />}
						colorScheme="red"
						onClick={onDeleteModalOpen}
					/>
					<RouteLink href={`/recuerdo/${memory.id}/editar`}>Editar</RouteLink>
				</HStack>
				<Card key={memory.id}>
					<CardHeader>
						<Text fontWeight="bold">{memory.title}</Text>
					</CardHeader>
					<CardBody>
						<Text>{String(new Date(memory.happenedAt))}</Text>
						<Image
							src={getPicturePublicUrl(memory.pictureName)}
							alt={memory.title}
							boxSize="150px"
							objectFit="cover"
						/>
					</CardBody>
					{!!memory.description && (
						<CardFooter>{memory.description}</CardFooter>
					)}
				</Card>

				{isDeleteModalOpen && (
					<DeleteMemoryAlertDialog
						memory={memory}
						onDelete={handleDeleteMemory}
						onClose={onDeleteModalClose}
					/>
				)}
			</>
		</>
	)
}

export default DetailsMemoryPage
