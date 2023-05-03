import { createClient } from '@supabase/supabase-js'

import { type Database } from '~/lib/database.types'

const supabase = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'unknown',
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'unknown'
)

export { supabase }
