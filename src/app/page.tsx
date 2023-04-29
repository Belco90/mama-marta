import HomePageView from '~/app/view'
import { retrieveAllPosts } from '~/lib/supabase-queries'

// do not cache this page
export const revalidate = 0

async function HomePage() {
	const { data } = await retrieveAllPosts()

	return (
		<main>
			<HomePageView posts={data ?? []} />
		</main>
	)
}

export default HomePage
