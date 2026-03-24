/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external domains (e.g., Airtable attachments)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.airtable.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
