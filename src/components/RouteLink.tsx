import { chakra } from '@chakra-ui/react'
// eslint-disable-next-line no-restricted-imports
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

const RouteLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
	shouldForwardProp: (prop: string): boolean => prop !== 'as',
})

export default RouteLink
