/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
		unoptimized: true,
	},
	async redirects() {
		return [{ source: '/', destination: '/recuerdos', permanent: true }]
	},
}

module.exports = nextConfig
