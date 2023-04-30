function getStoragePublicUrl(filePath: string): string {
	const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'unknown'
	return `${dbUrl}/storage/v1/object/public/picture/${filePath}`
}

export { getStoragePublicUrl }
