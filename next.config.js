/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "gcdp.oss-cn-qingdao.aliyuncs.com",
      "yxg-image.oss-cn-qingdao.aliyuncs.com",
    ],
  },
};

module.exports = nextConfig;
