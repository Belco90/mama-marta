'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { type ReactNode } from 'react'

import customTheme from '~/custom-theme'

interface ProvidersProps {
	children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<CacheProvider>
			<ChakraProvider theme={customTheme}>{children}</ChakraProvider>
		</CacheProvider>
	)
}

export default Providers
