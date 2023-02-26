import { withContentlayer } from 'next-contentlayer'

/** @type {import 'next'}.NextConfig */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}

export default withContentlayer(nextConfig)
