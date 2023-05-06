import { Image, type ImageProps } from '@chakra-ui/react'

import { type Memory } from '~/lib/supabase-queries'
import { getPicturePublicUrl } from '~/lib/utils'

interface PictureImageProps extends Omit<ImageProps, 'src'> {
	memory: Memory
	alt?: ImageProps['alt']
}

const PictureImage = ({ memory, ...remainingProps }: PictureImageProps) => {
	return (
		<Image
			src={getPicturePublicUrl(memory.pictureName)}
			alt=""
			width="full"
			height="full"
			objectFit="cover"
			{...remainingProps}
		/>
	)
}

export default PictureImage
