import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { type NextRequest, NextResponse } from 'next/server'

import { HOME_URL, LOGIN_URL } from '~/lib/utils'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareSupabaseClient({ req, res })
	const {
		data: { session },
	} = await supabase.auth.getSession()
	const isUserAuth = !!session
	const isLoginUrl = req.nextUrl.pathname === LOGIN_URL

	if (isUserAuth) {
		if (isLoginUrl) {
			return NextResponse.redirect(new URL(HOME_URL, req.url))
		}
		return res
	}

	if (!isLoginUrl) {
		return NextResponse.redirect(new URL(LOGIN_URL, req.url))
	}

	return res
}

export const config = {
	matcher: '/recuerdos/:path*',
}
