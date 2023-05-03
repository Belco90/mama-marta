// import { NextResponse } from 'next/server'
import { type NextRequest, NextResponse } from 'next/server'

const LOGIN_URL = '/acceso'

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname !== LOGIN_URL) {
		return NextResponse.redirect(new URL(LOGIN_URL, request.url))
	}
	// 	TODO: if logged in, redirect to homepage
}

export const config = {
	matcher: ['/((?!acceso|!api|_next/static|_next/image|favicon.ico).*)'],
}
