/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images served from any Supabase Storage project bucket.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
