import { supabase } from '~/lib/supabase-client'

const HOME_URL = '/recuerdos'
const LOGIN_URL = '/acceso'

function getPicturePublicUrl(filePath: string): string {
	const { data } = supabase.storage.from('picture').getPublicUrl(filePath)
	return data.publicUrl
}

export { HOME_URL, LOGIN_URL, getPicturePublicUrl }
