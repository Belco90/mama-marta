import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Heading,
	HStack,
	Image,
	Stack,
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
import { getPicturePublicUrl, HOME_URL } from '~/lib/utils'

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
		void router.push(HOME_URL)
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
			<NextSeo title={memory.title} />
			<>
				<Heading variant="main">Un recuerdo...</Heading>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					gap={{ base: 8, md: 60 }}
					alignItems="start"
				>
					<Card
						key={memory.id}
						shadow="dark-lg"
						borderRadius="0"
						fontFamily="hand"
					>
						<CardBody
							aspectRatio="1/1"
							overflow="hidden"
							p={{ base: 3, md: 4 }}
						>
							<Image
								src={getPicturePublicUrl(memory.pictureName)}
								alt={memory.title}
								width="100%"
								height="100%"
								objectFit="cover"
							/>
						</CardBody>
						<CardHeader>
							<Center>
								<Text as="h2" fontWeight="bold" fontSize="32" mb={8}>
									<Text as="u">{memory.title}</Text>
								</Text>
							</Center>
							<Text fontSize={24} as="cite">
								{String(new Date(memory.happenedAt))}
								{!!memory.description && ` - ${memory.description}`}
							</Text>
						</CardHeader>
					</Card>

					<HStack gap={4}>
						<Button
							colorScheme="red"
							onClick={onDeleteModalOpen}
							leftIcon={<HiTrash />}
							variant="link"
						>
							Borrar
						</Button>
						<RouteLink href={`/recuerdos/${memory.id}/editar`}>
							Editar
						</RouteLink>
					</HStack>
				</Stack>

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
