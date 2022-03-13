/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  redirects: async () => {
    return [
      {
        source: '/api/auth',
        destination: 'https://asianrainforest-yisy.auth.eu-west-2.amazoncognito.com/login?response_type=token&client_id=3opnd528mporva3m22jj12ccfc&redirect_uri=http://localhost:3000/api/auth&scope=phone',
        has: [
          {
            type: 'header',
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }],
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
