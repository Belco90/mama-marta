import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Heading,
	HStack,
	IconButton,
	Show,
	Spacer,
	Stack,
	Text,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { HiTrash, HiPencil, HiArrowLeft } from 'react-icons/hi'
import useSWR from 'swr'

import DeleteMemoryAlertDialog from '~/components/DeleteMemoryAlertDialog'
import PictureImage from '~/components/PictureImage'
import RouteLink from '~/components/RouteLink'
import { deleteMemory, retrieveMemory } from '~/lib/supabase-queries'
import { HOME_URL } from '~/lib/utils'

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

	const happenedAtFormatted = format(new Date(memory.happenedAt), 'PPPP', {
		locale: es,
	})

	return (
		<>
			<NextSeo title={memory.title} />
			<>
				<HStack mb={4} spacing={0}>
					<Heading variant="main">Un recuerdo</Heading>
					<Spacer />
					<Show above="md">
						<HStack>
							<RouteLink href="/recuerdos" legacyBehavior passHref>
								<Button
									as="a"
									colorScheme="secondary"
									leftIcon={<HiArrowLeft />}
									size="xs"
									variant="link"
								>
									Volver
								</Button>
							</RouteLink>
							<RouteLink
								href={`/recuerdos/${memory.id}/editar`}
								legacyBehavior
								passHref
							>
								<Button
									as="a"
									colorScheme="secondary"
									leftIcon={<HiPencil />}
									size="xs"
								>
									Editar
								</Button>
							</RouteLink>
							<Button
								colorScheme="red"
								onClick={onDeleteModalOpen}
								leftIcon={<HiTrash />}
								size="xs"
							>
								Borrar
							</Button>
						</HStack>
					</Show>
					<Show below="sm">
						<HStack spacing={1}>
							<RouteLink href="/recuerdos" legacyBehavior passHref>
								<IconButton
									as="a"
									aria-label="Volver"
									icon={<HiArrowLeft />}
									colorScheme="secondary"
									size="sm"
									variant="link"
								/>
							</RouteLink>
							<RouteLink
								href={`/recuerdos/${memory.id}/editar`}
								legacyBehavior
								passHref
							>
								<IconButton
									as="a"
									aria-label="Editar"
									icon={<HiPencil />}
									colorScheme="secondary"
									size="sm"
									variant="outline"
								/>
							</RouteLink>
							<IconButton
								aria-label="Borrar"
								icon={<HiTrash />}
								colorScheme="red"
								onClick={onDeleteModalOpen}
								size="sm"
								variant="outline"
							/>
						</HStack>
					</Show>
				</HStack>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					gap={{ base: 8, md: 10 }}
					alignItems="start"
				>
					<Card
						key={memory.id}
						shadow="dark-lg"
						borderRadius="0"
						fontFamily="hand"
						width={{ base: 'full', md: 'full' }}
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
								<Text as="h2" fontWeight="bold" fontSize="3xl">
									<Text as="u">{memory.title}</Text>
								</Text>
							</Center>
						</CardHeader>
					</Card>

					<VStack width="full" alignItems="end">
						{memory.description ? (
							<Box
								width={{ base: 'full', md: '80%' }}
								shadow="2xl"
								borderRadius="md"
							>
								<Box
									width="full"
									bgColor="#333"
									borderTopRadius="inherit"
									px={4}
									py={1}
									textColor="white"
									textAlign="right"
								>
									<Text as="em">{happenedAtFormatted}</Text>
								</Box>
								<Text
									fontFamily="hand"
									fontSize="22px"
									lineHeight="32px"
									minHeight={{ base: '15vh', md: '20vh' }}
									outline={0}
									width="full"
									height="full"
									overflowY="auto"
									background="repeating-linear-gradient(#F1EDE9, #F1EDE9 31px, #94ACD4 31px, #94ACD4 32px)"
									px={4}
									py={2}
								>
									{memory.description}
								</Text>
							</Box>
						) : (
							<Text>{happenedAtFormatted}</Text>
						)}
					</VStack>
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
