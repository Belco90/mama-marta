const LOGIN_URL = '/acceso'

function getPicturePublicUrl(filePath: string): string {
	const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'unknown'
	return `${dbUrl}/storage/v1/object/public/picture/${filePath}`
}

export { LOGIN_URL, getPicturePublicUrl }
