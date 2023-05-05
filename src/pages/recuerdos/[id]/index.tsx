import { Image } from '@chakra-ui/next-js'
import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Heading,
	HStack,
	IconButton,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { Caveat } from 'next/font/google'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { HiTrash } from 'react-icons/hi'
import useSWR from 'swr'

import DeleteMemoryAlertDialog from '~/components/DeleteMemoryAlertDialog'
import RouteLink from '~/components/RouteLink'
import { deleteMemory, retrieveMemory } from '~/lib/supabase-queries'
import { getPicturePublicUrl, HOME_URL } from '~/lib/utils'

const caveatFont = Caveat({ subsets: ['latin'] })

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
				<Card
					key={memory.id}
					p={{ base: 1, md: 4 }}
					className={caveatFont.className}
					shadow="dark-lg"
				>
					<CardBody>
						<Image
							src={getPicturePublicUrl(memory.pictureName)}
							alt={memory.title}
							width={memory.pictureMeta.width}
							height={memory.pictureMeta.height}
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

				<HStack pt={8}>
					<IconButton
						aria-label="Borrar este recuerdo"
						icon={<HiTrash />}
						colorScheme="red"
						onClick={onDeleteModalOpen}
					/>
					<RouteLink href={`/recuerdos/${memory.id}/editar`}>Editar</RouteLink>
				</HStack>

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
