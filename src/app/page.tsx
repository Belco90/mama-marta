import HomeView from '~/app/view'
import { retrieveAllPosts } from '~/lib/supabase-queries'

async function HomePage() {
	const { data } = await retrieveAllPosts()

	return (
		<main>
			<HomeView posts={data ?? []} />
		</main>
	)
}

export default HomePage
