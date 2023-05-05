import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { NextSeo } from 'next-seo'
import { type ChangeEvent, type FormEvent, useRef, useState } from 'react'
import { HiTrash } from 'react-icons/hi2'

import { type PictureMeta } from '~/lib/database.types'
import { createMemory } from '~/lib/supabase-queries'
import { HOME_URL } from '~/lib/utils'

const DEFAULT_PICTURE_META: PictureMeta = { width: 0, height: 0 }

const CreateMemoryPage = () => {
	const router = useRouter()
	const toast = useToast()
	const previewImgRef = useRef<HTMLImageElement | null>(null)
	const previewFileRef = useRef<HTMLInputElement>(null)
	const [previewImgFile, setPreviewImgFile] = useState<File | null>(null)
	const [pictureMeta, setPictureMeta] = useState<PictureMeta | null>(null)

	const handlePreviewImgLoad = () => {
		setPictureMeta({
			width: previewImgRef.current?.width ?? 0,
			height: previewImgRef.current?.height ?? 0,
		})
	}

	const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.currentTarget.files
		if (files && files.length > 0) {
			setPreviewImgFile(files[0])
		}
	}

	const handleClearFile = () => {
		setPreviewImgFile(null)
		setPictureMeta(null)
		if (previewFileRef.current) {
			previewFileRef.current.value = ''
		}
	}

	const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const memoryData = Object.fromEntries(formData) as {
			title: string
			description: string | null
			happenedAt: string
			picture: File
		}
		memoryData.description ||= null

		await createMemory({
			...memoryData,
			pictureMeta: pictureMeta || DEFAULT_PICTURE_META,
		})

		toast({
			title: 'Nuevo recuerdo creado correctamente',
			status: 'success',
			isClosable: true,
		})
		router.push(HOME_URL)
	}

	const previewImgSrc = previewImgFile && URL.createObjectURL(previewImgFile)

	return (
		<>
			<NextSeo title="Crear recuerdo" />
			<Heading variant="main">Crea un nuevo recuerdo</Heading>
			<form onSubmit={handleCreateMemory}>
				<VStack gap={4} alignItems="start">
					<FormControl isRequired>
						<FormLabel>Foto</FormLabel>
						{!!previewImgSrc && (
							<VStack alignItems="start">
								<Image
									src={previewImgSrc}
									alt="Vista previa de la foto seleccionada"
									ref={previewImgRef}
									onLoad={handlePreviewImgLoad}
								/>
								<Button color="red" variant="link" onClick={handleClearFile}>
									<HiTrash />
									Eliminar foto
								</Button>
							</VStack>
						)}
						<Input
							display={previewImgSrc ? 'none' : undefined}
							name="picture"
							type="file"
							accept="image/*"
							onChange={handleInputFileChange}
							ref={previewFileRef}
						/>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Título</FormLabel>
						<Input name="title" />
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Fecha</FormLabel>
						<Input name="happenedAt" type="date" />
					</FormControl>

					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea name="description" />
					</FormControl>
					<Button type="submit">Crear</Button>
				</VStack>
			</form>
		</>
	)
}

export default CreateMemoryPage
