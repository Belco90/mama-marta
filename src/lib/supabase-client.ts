import { createClient } from '@supabase/supabase-js'

import { type Database } from '~/lib/database.types'

type Post = Database['public']['Tables']['Post']['Row']

const supabase = createClient<Database>(
	process.env.SUPABASE_URL ?? 'unknown',
	process.env.SUPABASE_KEY ?? 'unknown'
)

async function retrieveAllPosts() {
	return supabase.from('Post').select('*').order('happenedAt')
}

export { supabase, retrieveAllPosts, type Post }
