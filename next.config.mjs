/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Avoid build halts on Vercel during CI/CD; linting is independently verified
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensure strict type-checking stays verified
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
