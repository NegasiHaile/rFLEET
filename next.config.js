/** @type {import('next').NextConfig} */

const withVideos = require('next-videos')

const nextConfig = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      vertx: false
    }

    config.resolve.alias['istextorbinary'] = false

    return config
  }
}

module.exports = withVideos(nextConfig)
