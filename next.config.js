// next.config.js
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });
  
  const nextConfig = {
    // you can add more Next.js config here if needed
  };
  
  module.exports = withPWA(nextConfig);
  