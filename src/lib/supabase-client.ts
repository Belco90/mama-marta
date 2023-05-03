import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { type Database } from '~/lib/database.types'

const supabase = createBrowserSupabaseClient<Database>()

export { supabase }
