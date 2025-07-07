/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otjdkbbcooizrhrytrpq.supabase.co', // Asegúrate de que sea el correcto
      },
      {
        protocol: 'https',
        hostname: 'tvpgriftsewiyitmmyci.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
