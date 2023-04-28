import 'server-only'

import { createClient } from '@supabase/supabase-js'

import { type Database } from '~/lib/database.types'

export const supabase = createClient<Database>(
	process.env.SUPABASE_URL ?? 'unknown',
	process.env.SUPABASE_KEY ?? 'unknown'
)
