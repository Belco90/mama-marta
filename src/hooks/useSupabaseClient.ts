// eslint-disable-next-line no-restricted-imports
import { useSupabaseClient as useSupabaseClientHelper } from '@supabase/auth-helpers-react'

import { type Database } from '~/lib/database.types'

function useSupabaseClient() {
	return useSupabaseClientHelper<Database>()
}

export { useSupabaseClient }
