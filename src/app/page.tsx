import HomePageView from '~/app/view'
import { retrieveAllPosts } from '~/lib/supabase-client'

// do not cache this page
export const revalidate = 0

async function HomePage() {
	const { data: posts } = await retrieveAllPosts()

	return (
		<main>
			<HomePageView posts={posts ?? []} />
		</main>
	)
}

export default HomePage
