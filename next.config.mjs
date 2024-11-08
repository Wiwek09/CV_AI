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
        hostname: "cvai.azurewebsites.net",
        pathname: "/cv_images/**", // Path to the images in the backend
      },
    ],
  },
};

export default nextConfig;
