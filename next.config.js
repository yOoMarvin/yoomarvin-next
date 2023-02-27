const { withContentlayer } = require('next-contentlayer') // eslint-disable-line

/** @type {import 'next'}.NextConfig */
const nextConfig = {
    experimental: {
        appDir: true,
    },
}

module.exports = withContentlayer(nextConfig)
