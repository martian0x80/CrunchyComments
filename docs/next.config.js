/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { dev }) => {
		// Disable cache in development
		if (dev) {
			config.cache = false
		}
		return config
	},
}

export default nextConfig
