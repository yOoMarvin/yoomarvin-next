import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true,
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/writing',
                permanent: true,
            },
            {
                source: '/blog/:slug',
                destination: '/writing/:slug',
                permanent: true,
            },
        ]
    },
}

export default nextConfig
