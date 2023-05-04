import { supabase } from '~/lib/supabase-client'

const LOGIN_URL = '/acceso'

function getPicturePublicUrl(filePath: string): string {
	const { data } = supabase.storage.from('picture').getPublicUrl(filePath)
	return data.publicUrl
}

export { LOGIN_URL, getPicturePublicUrl }
