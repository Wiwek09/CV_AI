/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cvai.rebuzzpos.com",
        pathname: "/cv_images/**", // Path to the images in the backend
      },
    ],
  },
};

export default nextConfig;
