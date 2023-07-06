/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['files.stripe.com', 'unsplash.com'],
	},
}

module.exports = nextConfig
