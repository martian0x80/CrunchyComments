/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
  distDir: './out',
  images: {
    unoptimized: true,
},
}

export default nextConfig
